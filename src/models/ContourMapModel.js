import mongoose from 'mongoose';

const ContourMapSchema = new mongoose.Schema(
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
      trim: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

ContourMapSchema.index({ name: 1, user: 1 }, { unique: true }); // It is not possible to exist contour maps with the same name per user

const ContourMapModel = mongoose.model('ContourMap', ContourMapSchema);
export default ContourMapModel;
