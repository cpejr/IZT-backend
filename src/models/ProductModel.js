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
      required: true,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model('Product', productSchema);
export default productModel;
