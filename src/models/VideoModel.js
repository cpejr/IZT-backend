import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    file: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const videoModel = mongoose.model('Video', videoSchema);
export default videoModel;
