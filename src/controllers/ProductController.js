import asyncHandler from '../utils/asyncHandler.js';
import ProductModel from '../models/ProductModel.js';

export const get = asyncHandler(async (req, res) => {
  const products = await ProductModel.find();
  res.status(200).json({ success: true, data: products });
});

export const getById = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.status(200).json({ success: true, data: product });
});

export const create = asyncHandler(async (req, res) => {
  const product = await ProductModel.create(req.body);
  res.status(201).json({ success: true, data: product });
});

export const update = asyncHandler(async (req, res) => {
  let product = await ProductModel.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: product });
});

export const destroy = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  await product.remove();
  res.status(200).json({ success: true, data: {} });
});
