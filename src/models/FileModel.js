import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

FileSchema.pre('remove', function () {});
FileSchema.pre('deleteMany', function () {});

const FileModel = mongoose.model('File', FileSchema);
export default FileModel;
