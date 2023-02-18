import UserModel from '../models/UserModel.js';

export async function createUser(req, res, next) {
  try {
    const user = new UserModel(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function getUserById(req, res, next) {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req, res, next) {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function getAllUsers(req, res, next) {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}
