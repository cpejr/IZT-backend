import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Precisa mesmo desse unique?
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

const VideoModel = mongoose.model('Video', videoSchema);
export default VideoModel;
