import asyncHandler from '../utils/asyncHandler.js';
import CategoryModel from '../models/CategoryModel.js';

export const get = asyncHandler(async (req, res) => {
  const categorys = await CategoryModel.find();
  res.status(200).json({ success: true, data: categorys });
});

export const getById = asyncHandler(async (req, res) => {
  const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  res.status(200).json({ success: true, data: category });
});

export const create = asyncHandler(async (req, res) => {
  const category = await CategoryModel.create(req.body);
  res.status(201).json({ success: true, data: category });
});

export const update = asyncHandler(async (req, res) => {
  let category = await CategoryModel.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: category });
});

export const destroy = asyncHandler(async (req, res) => {
  const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  await category.remove();
  res.status(200).json({ success: true, data: {} });
});
