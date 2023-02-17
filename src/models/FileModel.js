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
<<<<<<< HEAD
      required true,
=======
      required: true,
>>>>>>> ModelsAndControllers
      unique: true,
    },
    mimeType: {
      type: String,
      require: true,
    },
    url: {
      type: String,
<<<<<<< HEAD
      required: true,
=======
>>>>>>> ModelsAndControllers
    },
  },
  { timestamps: true }
);

const fileModel = mongoose.model('File', fileSchema);
export default fileModel;
