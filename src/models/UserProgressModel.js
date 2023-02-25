import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema(
  {
    video: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    progress: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

userProgressSchema.index({ user: 1, video: 1 }, { unique: true }); // Only one progress for the same video and user

const UserProgressModel = mongoose.model('User Progress', userProgressSchema);
export default UserProgressModel;
