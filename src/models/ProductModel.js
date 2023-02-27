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
  await FileModel.deleteFiles([
    ...populatedProduct.pictures,
    ...populatedProduct.documents,
  ]);
  next();
});

ProductSchema.statics.createWithFiles = async function (inputData) {
  const { documents, pictures, ...data } = inputData;

  const [createdPictures, createdDocuments] = await Promise.all([
    FileModel.uploadFiles(pictures),
    FileModel.uploadFiles(documents),
  ]);

  const picturesIds = createdPictures.map(({ _id }) => _id);
  const documentsIds = createdDocuments.map(({ _id }) => _id);

  return this.create({
    pictures: picturesIds,
    documents: documentsIds,
    ...data,
  });
};

ProductSchema.methods.updateFiles = async function (inputData) {
  const newInputData = { ...inputData };

  if (inputData.pictures) await FileModel.deleteFiles(this.pictures);
  if (inputData.documents) await FileModel.deleteFiles(this.documents);

  if (inputData?.pictures?.length) {
    const newPictures = await FileModel.uploadFiles(inputData.pictures);
    newInputData.pictures = newPictures.map(({ _id }) => _id);
  }

  if (inputData?.documents?.length) {
    const newDocuments = await FileModel.uploadFiles(inputData.documents);
    newInputData.documents = newDocuments.map(({ _id }) => _id);
  }

  return newInputData;
};

const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;
