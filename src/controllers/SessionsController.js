import jwt from 'jsonwebtoken';
import { SUCCESS_CODES } from '../utils/constants.js';
import formatExpiresAt from '../utils/formatExpiresAt.js';
import asyncHandler from '../utils/asyncHandler.js';
import UserModel from '../models/UserModel.js';
import UserTokenModel from '../models/UserTokenModel.js';
import { UnauthorizedError, ForbiddenError } from '../errors/BaseErrors.js';
import loginValidator from '../validators/SessionsValidator.js';

export const handleLogin = asyncHandler(async (req, res) => {
  const { email, password } = loginValidator(req);

  const foundUser = await UserModel.findOne({ email }).exec();
  if (!foundUser) throw new UnauthorizedError('Wrong email or password.');

  // evaluate password
  const isMatch = await foundUser.comparePassword(password);
  if (!isMatch) throw new UnauthorizedError('Wrong email or password.');

  // evaluate token reuse
  const { cookies } = req;
  if (cookies?.jwt) {
    const refreshToken = cookies.jwt;
    const foundToken = await UserTokenModel.findOne({
      token: refreshToken,
    }).exec();

    // Detected refresh token reuse! Clear all existing refreshTokens
    if (!foundToken) await UserTokenModel.deleteMany({ user: foundUser._id });
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });
  }

  // create JWTs
  const accessToken = jwt.sign(
    {
      userId: foundUser._id,
      isAdmin: foundUser.isAdmin,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: +process.env.ACCESS_TOKEN_EXPIRE } // in seconds
  );
  const newRefreshToken = jwt.sign(
    { userId: foundUser._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: +process.env.REFRESH_TOKEN_EXPIRE } // in seconds
  );

  // Saving refreshToken in the DB
  const expiresAt = formatExpiresAt(process.env.REFRESH_TOKEN_EXPIRE); // in seconds
  await UserTokenModel.create({
    user: foundUser._id,
    token: newRefreshToken,
    expiresAt,
  });

  // Creates Secure Cookie with refresh token
  res.cookie('jwt', newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: process.env.REFRESH_TOKEN_EXPIRE * 1000, // in miliseconds
  });

  // Send access token to user
  res.status(SUCCESS_CODES.OK).json({ accessToken });
});

export const handleRefreshToken = asyncHandler(async (req, res) => {
  const { cookies } = req;
  if (!cookies?.jwt) throw new UnauthorizedError('Unauthorized');

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

  const refreshToken = cookies.jwt;
  const foundToken = await UserTokenModel.findOne({ token: refreshToken })
    .populate('user')
    .exec();

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  if (!foundToken) {
    const hackedUser = await UserModel.findOne({
      _id: decoded.userId,
    }).exec();
    await UserTokenModel.deleteMany({ user: hackedUser._id }).exec();
    throw new ForbiddenError('Token reuse');
  }
  const userId = foundToken.user._id.toString();
  const { isAdmin } = foundToken.user;

  if (userId !== decoded.userId) throw new ForbiddenError('Tampered token');

  // Refresh token still valid
  await foundToken.delete(); // Invalidate actual refresh token
  const accessToken = jwt.sign(
    {
      userId,
      isAdmin,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: +process.env.ACCESS_TOKEN_EXPIRE } // in seconds
  );
  const newRefreshToken = jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: +process.env.REFRESH_TOKEN_EXPIRE } // in seconds
  );

  // Creating a instance of the refresh token in the db
  const expiresAt = formatExpiresAt(process.env.REFRESH_TOKEN_EXPIRE); // in miliseconds
  await UserTokenModel.create({
    user: userId,
    token: newRefreshToken,
    expiresAt,
  });

  // Creates Secure Cookie with refresh token
  res.cookie('jwt', newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: process.env.REFRESH_TOKEN_EXPIRE * 1000, // time in miliseconds
  });

  res.status(SUCCESS_CODES.OK).json({ accessToken });
});

export const handleLogout = asyncHandler(async (req, res) => {
  const { cookies } = req;
  if (!cookies?.jwt) return res.sendStatus(SUCCESS_CODES.NO_CONTENT); // No content

  // delete refresh token if exists in db
  const refreshToken = cookies.jwt;
  await UserTokenModel.findOne({ token: refreshToken }).deleteOne().exec();

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  return res.sendStatus(SUCCESS_CODES.NO_CONTENT);
});
