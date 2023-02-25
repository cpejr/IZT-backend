import mongoose from 'mongoose';

const UserCertificateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
  },
  { timestamps: true }
);

const UserCertificateModel = mongoose.model(
  'User Certificate',
  UserCertificateSchema
);
export default UserCertificateModel;
