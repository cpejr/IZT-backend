import mongoose from 'mongoose';
import ProductModel from './ProductModel.js';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }, // More details on https://mongoosejs.com/docs/tutorials/virtuals.html#populate
    id: false, // Good to disable when using virtual properties to not show up in the output
  }
);

// Populate all products within the category
CategorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category',
}); // More details on https://mongoosejs.com/docs/tutorials/virtuals.html#populate

// Delete all products inside the removed category
CategorySchema.pre('remove', async function (next) {
  await ProductModel.remove({ category: this._id }).exec();
  next();
}); // More details on https://stackoverflow.com/questions/14348516/cascade-style-delete-in-mongoose

const CategoryModel = mongoose.model('Category', CategorySchema);
export default CategoryModel;
