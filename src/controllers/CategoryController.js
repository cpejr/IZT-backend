import asyncHandler from '../utils/asyncHandler.js';
import CategoryModel from '../models/CategoryModel.js';
import * as CategoryValidator from '../validators/CategoryValidator.js';
import { SUCCESS_CODES } from '../utils/constants.js';
import { NotFoundError } from '../errors/baseErrors.js';

export const get = asyncHandler(async (req, res) => {
  const inputFilters = CategoryValidator.get(req);
  const categories = await CategoryModel.find(inputFilters)
    .populate({ path: 'products', populate: { path: 'pictures' } })
    .exec();
  res.status(SUCCESS_CODES.OK).json(categories);
});

export const create = asyncHandler(async (req, res) => {
  const inputData = CategoryValidator.create(req);
  const newCategory = await CategoryModel.create(inputData);
  res.status(SUCCESS_CODES.CREATED).json(newCategory);
});

export const update = asyncHandler(async (req, res) => {
  const { _id, ...inputData } = CategoryValidator.update(req);

  const foundCategory = await CategoryModel.findById(_id).exec();
  if (!foundCategory) throw new NotFoundError('Category not found');

  const updatedCategory = foundCategory.set(inputData);
  await updatedCategory.save();

  res.status(SUCCESS_CODES.OK).json(updatedCategory);
});

export const destroy = asyncHandler(async (req, res) => {
  const { _id } = CategoryValidator.destroy(req);

  const foundCategory = await CategoryModel.findById(_id).exec();
  if (!foundCategory) throw new NotFoundError('Category not found');

  await foundCategory.remove();
  res.sendStatus(SUCCESS_CODES.NO_CONTENT);
});
