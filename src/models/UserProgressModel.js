import mongoose from 'mongoose';

const UserProgressSchema = new mongoose.Schema(
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
      min: [0, 'Progress cannot be less than 0'],
    },
  },
  {
    timestamps: true,
    optimisticConcurrency: true, // For properties 'progress'. More details on https://thecodebarbarian.com/whats-new-in-mongoose-5-10-optimistic-concurrency.html
  }
);

UserProgressSchema.index({ user: 1, video: 1 }, { unique: true }); // Only one progress for the same video and user

const UserProgressModel = mongoose.model('UserProgress', UserProgressSchema);
export default UserProgressModel;
