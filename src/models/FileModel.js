import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    size: {
      type: Number,
      require: true,
    },
    key: {
      type: String,
      require: true,
      unique: true,
    },
    mimeType: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const fileModel = mongoose.model('File', fileSchema);
export default fileModel;
