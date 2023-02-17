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
<<<<<<< HEAD:src/models/UserCertificateModel.js
      ref: 'Course'
      require: true,
     
=======
      ref: 'Course',
      required: true,
>>>>>>> ModelsAndControllers:src/models/UserCertificate.js
    },
  },
  { timestamps: true }
);

const userCertificateModel = mongoose.model(
  'User Certificate',
  userCertificateSchema
);
export default userCertificateModel;
