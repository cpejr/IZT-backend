import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    nacionality: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    complement: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 15, partialFilterExpression: { isActive: false } }
); // After 15 minutes, if the user is not active, the document will be automatically deleted

const userModel = mongoose.model('User', userSchema);
export default userModel;
