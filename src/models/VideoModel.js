import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    theme: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: [0, 'Course duration cannot be less than 0 millisecond'],
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    file: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    optimisticConcurrency: true, // For properties 'duration'. More details on https://thecodebarbarian.com/whats-new-in-mongoose-5-10-optimistic-concurrency.html
  }
);

VideoSchema.index({ name: 1, course: 1 }, { unique: true }); // It is not possible to exist more than 1 video with the same name inside a course

const VideoModel = mongoose.model('Video', VideoSchema);
export default VideoModel;
