import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
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
  { timestamps: true }
);
const courseModel = mongoose.model('Course', courseSchema);
export default courseModel;
