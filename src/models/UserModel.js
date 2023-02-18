import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['ADMINISTRATOR', 'USER'],
      default: 'USER',
    },
    name: {
      type: String,
      required: true,
    },
    userName: {
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
    cpf: {
      type: String,
      required: true,
      unique: true,
    },
    birth: {
      type: Date,
      required: true,
    },
    birthPlace: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['MASCULINO', 'FEMININO', 'OUTRO'],
    },
    civilState: {
      type: String,
      enum: [
        'SOLTEIRO(A)',
        'CASADO(A)',
        'DIVORCIADO(A)',
        'DESQUITADO(A)',
        'OUTRO',
      ],
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
    cep: {
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
    district: {
      type: String,
      required: true,
    },
    admissionDate: {
      type: Date,
      required: true,
    },
    courses: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model('User', userSchema);
export default userModel;
