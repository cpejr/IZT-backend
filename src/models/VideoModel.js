import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true, //Precisa mesmo desse unique?
    },
    theme: {
      type: String,
      require: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: 'Course',
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    duration: {
      type: Number,
      require: true,
    },
    file: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
  },
  { timestamps: true }
);

const videoModel = mongoose.model('Video', videoSchema);
export default videoModel;
