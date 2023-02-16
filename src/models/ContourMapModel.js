import mongoose from 'mongoose';

const contourMapSchema = new mongoose.Schema(
  {
    data: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);
const contourMapModel = mongoose.model('ContourMap', contourMapSchema);
export default contourMapModel;
