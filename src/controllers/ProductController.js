import ProductModel from '../models/ProductModel.js';

export async function index(req, res, next) {
  try {
    console.log(req);
    const products = await ProductModel.find();
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
}

export async function exclude(req, res, next) {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
