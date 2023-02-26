import asyncHandler from '../utils/asyncHandler.js';
import ProductModel from '../models/ProductModel.js';
import * as ProductValidator from '../validators/ProductValidator.js';
import { SUCCESS_CODES } from '../utils/constants.js';
import { NotFoundError } from '../errors/BaseErrors.js';

export const get = asyncHandler(async (req, res) => {
  const inputFilters = ProductValidator.get(req);
  const products = await ProductModel.find(inputFilters)
    .populate('category')
    .populate('pictures')
    .populate('documents')
    .exec();
  res.status(SUCCESS_CODES.OK).json(products);
});

export const create = asyncHandler(async (req, res) => {
  const inputData = ProductValidator.create(req);
  const newProduct = await ProductModel.createWithFiles(inputData);
  res.status(SUCCESS_CODES.CREATED).json(newProduct);
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
  const { _id } = ProductValidator.destroy(req);

  const foundProduct = await ProductModel.findById(_id).exec();
  if (!foundProduct) throw new NotFoundError('Product not found');

  await foundProduct.remove();
  res.sendStatus(SUCCESS_CODES.NO_CONTENT);
});
