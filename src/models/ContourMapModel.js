import mongoose from 'mongoose';

const contourMapSchema = new mongoose.Schema(
  {
    tangentAngleData: {
      type: String,
      required: true,
    },
    workplaceHighData: {
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

contourMapSchema.index({ name: 1, user: 1 }, { unique: true }); // It is not possible to exist contour maps with the same name per user

const ContourMapModel = mongoose.model('ContourMap', contourMapSchema);
export default ContourMapModel;
