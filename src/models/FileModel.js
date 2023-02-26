import mongoose from 'mongoose';
import * as awsS3 from '../config/awsS3.js';

const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: Number,
      required: true,
      min: [0, 'File size cannot be less than 0 bytes'],
    },
    key: {
      type: String,
      required: true,
      unique: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    url: String,
  },
  { timestamps: true, versionKey: false }
);

FileSchema.pre('save', function (next) {
  if (!this.url) {
    this.url = `${process.env.URL}/api/files/${this.key}`;
  }
  next();
});
FileSchema.pre('insertMany', function (next, docs) {
  docs.forEach((doc) => {
    if (!doc.url) {
      // eslint-disable-next-line no-param-reassign
      doc.url = `${process.env.BACKEND_URL}/api/files/${doc.key}`;
    }
  });
  next();
});

FileSchema.statics.putObject = async function (file) {
  const uploadedFile = await awsS3.uploadOneFile(file);
  const fileToCreate = { key: uploadedFile.key, ...file };
  const insertedFile = await this.create(fileToCreate);

  return insertedFile._id;
};
FileSchema.statics.putObjects = async function (files) {
  const keys = (await awsS3.uploadFiles(files)).map(({ key }) => key);

  const filesToInsert = files.map((file, idx) => ({ key: keys[idx], ...file }));
  const insertedFiles = await this.insertMany(filesToInsert);

  return insertedFiles.map(({ _id }) => _id);
};

FileSchema.statics.deleteManyWithStorage = async function (files) {
  const deleteStorageRequests = files.map(({ key }) => awsS3.deleteFile(key));
  const filesIds = files.map(({ _id }) => _id);

  await Promise.all([
    this.deleteMany({ _id: filesIds }).exec(),
    deleteStorageRequests,
  ]);
};

const FileModel = mongoose.model('File', FileSchema);
export default FileModel;
