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
  { timestamps: true, versionKey: false }
);

const UserCertificateModel = mongoose.model(
  'UserCertificate',
  UserCertificateSchema
);
export default UserCertificateModel;
