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
      require: true,
      unique: true,
    },
    userName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    nacionality: {
      type: String,
      require: true,
    },
    cpf: {
      type: String,
      require: true,
      unique: true,
    },
    birth: {
      type: Date,
      require: true,
    },
    birthPlace: {
      type: String,
      require: true,
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
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    cep: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    number: {
      type: String,
      require: true,
    },
    complement: {
      type: String,
      require: true,
    },
    district: {
      type: String,
      require: true,
    },
    admissionDate: {
      type: Date,
      require: true,
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
