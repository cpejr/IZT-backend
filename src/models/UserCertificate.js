import mongoose from 'mongoose';

const userCertificateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      require: true,
      unique: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: 'Course'
      require: true,
     
    },
  },
  { timestamps: true }
);

const userCertificateModel = mongoose.model('User Certificate', userCertificateSchema);
export default userCertificateModel;
