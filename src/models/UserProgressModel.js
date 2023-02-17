import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema(
  {
    video: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
<<<<<<< HEAD
      ref: 'User'
=======
      ref: 'User',
>>>>>>> ModelsAndControllers
      required: true,
      unique: true,
    },
    progress: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const userProgressModel = mongoose.model('User Progress', userProgressSchema);
export default userProgressModel;
