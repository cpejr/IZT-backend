import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    purchases: {
      type: Number,
      default: 0,
      min: [0, 'Purchases cannot be less than 0'],
      required: true,
    },
    picture: {
      type: [mongoose.Types.ObjectId],
      ref: 'File',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    documents: {
      type: [mongoose.Types.ObjectId],
      ref: 'File',
      default: [],
      required: true,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;
