import mongoose from 'mongoose';

const userCertificateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: 'Course'
      required: true,
     
    },
  },
  { timestamps: true }
);

const userCertificateModel = mongoose.model('User Certificate', userCertificateSchema);
export default userCertificateModel;
