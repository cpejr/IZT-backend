import mongoose from 'mongoose';

const userTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

userTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const userTokenModel = mongoose.model('UserToken', userTokenSchema);
export default userTokenModel;
