import mongoose from 'mongoose';

const userTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      require: true,
      unique: true,
    },
    token: {
      type: String,
      require: true,
      unique: true, // é unique mesmo?
    },
    rememberMe: {
      type: Boolean,
      required: true,
      unique: true, // é unique mesmo?
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const userTokenModel = mongoose.model('User Token', userTokenSchema);
export default userTokenModel;
