import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema(
  {
    video: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
      required: true,
      unique: true,
    },
    progress: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const userProgressModel = mongoose.model('User Progress', userProgressSchema);
export default userProgressModel;
