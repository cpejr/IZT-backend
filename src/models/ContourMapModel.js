import mongoose from 'mongoose';

const contourMapSchema = new mongoose.Schema(
  {
    data: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      require: true,
    },
  },
  { timestamps: true }
);
const contourMapModel = mongoose.model('ContourMap', contourMapSchema);
export default contourMapModel;
