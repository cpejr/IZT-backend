import asyncHandler from '../utils/asyncHandler.js';
import UserModel from '../models/UserModel.js';
import * as UserValidator from '../validators/UserValidator.js';
import { SUCCESS_CODES } from '../utils/constants.js';
import { NotFoundError } from '../errors/baseErrors.js';

export const get = asyncHandler(async (req, res) => {
  const inputFilters = UserValidator.get(req);
  const users = await UserModel.find(inputFilters).select('-password').exec();
  res.status(SUCCESS_CODES.OK).json(users);
});

export const create = asyncHandler(async (req, res) => {
  const inputData = UserValidator.create(req);
  const { password, ...newUser } = (
    await UserModel.create(inputData)
  ).toObject();

  res.status(SUCCESS_CODES.CREATED).json(newUser);
});

export const update = asyncHandler(async (req, res) => {
  const { _id, ...inputData } = UserValidator.update(req);

  const foundUser = await UserModel.findById(_id).select('-password').exec();
  if (!foundUser) throw new NotFoundError('User not found');

  const updatedUser = foundUser.set(inputData);
  await updatedUser.save();

  res.status(SUCCESS_CODES.OK).json(updatedUser);
});

export const destroy = asyncHandler(async (req, res) => {
  const { _id } = UserValidator.destroy(req);

  const foundUser = await UserModel.findById(_id).exec();
  if (!foundUser) throw new NotFoundError('User not found');

  await foundUser.remove();
  res.sendStatus(SUCCESS_CODES.NO_CONTENT);
});
