import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    duration: {
      type: Number,
      required: true,
      min: [0, 'Course duration cannot be less than 0 millisecond'],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be lesser than 0'],
    },
  },
  {
    timestamps: true,
    optimisticConcurrency: true, // For properties 'duration' and 'price'. More details on https://thecodebarbarian.com/whats-new-in-mongoose-5-10-optimistic-concurrency.html
  }
);
const CourseModel = mongoose.model('Course', CourseSchema);
export default CourseModel;
