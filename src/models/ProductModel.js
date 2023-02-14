import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      require: true,
    },
    name: {
      type: String,
      require: true,
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
      require: true,
    },
    documents: {
      type: [mongoose.Types.ObjectId],
      ref: 'File',
      require: true,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model('Product', productSchema);
export default productModel;
