import mongoose from 'mongoose';

const userTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const UserTokenModel = mongoose.model('UserToken', userTokenSchema);

export default UserTokenModel;
