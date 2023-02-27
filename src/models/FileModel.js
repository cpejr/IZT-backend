import mongoose from 'mongoose';
import * as awsS3 from '../config/awsS3.js';
import filesUrl from '../utils/files/filesUrl.js';

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
    this.url = `${filesUrl}/${this.key}`;
  }
  next();
});
FileSchema.pre('insertMany', function (next, docs) {
  docs.forEach((doc) => {
    if (!doc.url) {
      // eslint-disable-next-line no-param-reassign
      doc.url = `${filesUrl}/${doc.key}`;
    }
  });
  next();
});

FileSchema.statics.uploadOneFile = async function (file) {
  const fileToCreate = await awsS3.uploadOneFile(file);
  const createdFile = await this.create(fileToCreate);

  return createdFile;
};
FileSchema.statics.uploadFiles = async function (files) {
  const filesToInsert = await awsS3.uploadFiles(files);
  const insertedFiles = await this.insertMany(filesToInsert);

  return insertedFiles;
};

FileSchema.statics.deleteOneFile = async function (fileId) {
  if (!fileId) return;

  const file = await this.findById(fileId).exec();

  await Promise.all([
    this.remove({ _id: file._id }).exec(),
    awsS3.deleteOneFile(file.key),
  ]);
};
FileSchema.statics.deleteFiles = async function (filesIds) {
  if (!filesIds.length) return;

  const files = await this.find({ _id: filesIds }).exec();
  const keys = files.map(({ key }) => key);
  const ids = files.map(({ _id }) => _id);

  await Promise.all([
    this.deleteMany({ _id: ids }).exec(),
    awsS3.deleteFiles(keys),
  ]);
};

const FileModel = mongoose.model('File', FileSchema);
export default FileModel;
