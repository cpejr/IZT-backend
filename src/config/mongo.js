import mongoose from 'mongoose';
import { InternalServerError } from '../errors/BaseErrors.js';
import logger from './logger.js';

mongoose.Promise = global.Promise;

export default function mongoConfig() {
  return new Promise((resolve, reject) => {
    const mongoUrl =
      'mongodb+srv://' +
      `${encodeURI(process.env.MONGO_USER)}:` +
      `${encodeURI(process.env.MONGO_PASS)}@` +
      `${encodeURI(process.env.MONGO_SERVER)}/` +
      `${encodeURI(process.env.MONGO_DATABASE)}?` +
      `${encodeURI(process.env.MONGO_OPTIONS)}`;

    mongoose.set('strictQuery', true);
    mongoose.connect(mongoUrl);
    mongoose.connection.once('open', () => {
      logger.info('✅ Established connection with mongodb');
      resolve(mongoose);
    });

    mongoose.connection.on('error', (error) => {
      const err = new InternalServerError(
        `❌ Failed to connect to mongoDB. Error: ${error}.`
      );
      reject(err);
    });
  });
}
