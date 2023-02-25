import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
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
    description: {
      type: String,
      required: true,
    },
    purchases: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Purchases cannot be less than 0'],
    },
    pictures: {
      type: [mongoose.Types.ObjectId],
      ref: 'File',
      required: true,
      validate: {
        validator: (pictures) => pictures.legth,
        message: 'Pictures property cannot be a empty array',
      },
    },
    documents: {
      type: [mongoose.Types.ObjectId],
      ref: 'File',
      required: true,
    },
  },
  {
    timestamps: true,
    optimisticConcurrency: true, // For properties 'purchases' and 'pictures'. More details on https://thecodebarbarian.com/whats-new-in-mongoose-5-10-optimistic-concurrency.html
  }
);

const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;
