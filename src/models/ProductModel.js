import mongoose from 'mongoose';
import FileModel from './FileModel.js';

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
      trim: true,
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

ProductSchema.pre('remove', async function (next) {
  const populatedProduct = await this.populate(['pictures', 'documents']);

  await FileModel.deleteManyWithStorage([
    ...populatedProduct.pictures,
    ...populatedProduct.documents,
  ]);
  next();
});

ProductSchema.statics.createWithFiles = async function (inputData) {
  const { documents, pictures, ...data } = inputData;

  const [picturesIds, documentsIds] = await Promise.all([
    FileModel.putObjects(pictures),
    FileModel.putObjects(documents),
  ]);

  return this.create({
    pictures: picturesIds,
    documents: documentsIds,
    ...data,
  });
};

const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;
