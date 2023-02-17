import mongoose from 'mongoose';

export default function mongoConfig() {
  return new Promise((resolve, reject) => {
    const mongoUrl =
      'mongodb+srv://' +
      `${encodeURI(process.env.MONGO_USER)}:` +
      `${encodeURI(process.env.MONGO_PASS)}@` +
      `${encodeURI(process.env.MONGO_SERVER)}/?` +
      `${encodeURI(process.env.MONGO_OPTIONS)}`;

    mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.once('open', () => {
      console.log('✅ Established connection with mongodb');
      resolve();
    });

    mongoose.connection.on('error', (error) => {
      const err = new Error(
        `❌ Failed to connect to mongoDB. Error: ${error}.`
      );
      reject(err);
    });
  });
}
