import mongoose from 'mongoose';

const UserTokenSchema = new mongoose.Schema(
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

UserTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const UserTokenModel = mongoose.model('UserToken', UserTokenSchema);
export default UserTokenModel;
