import mongoose from 'mongoose';

export default function mongoConfig() {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      'mongodb+srv://Sirius_CPE:<password>@cluster0.hihiaoi.mongodb.net/?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    mongoose.connection.on('error', (error) => {
      const err = new Error(
        `❌ Failed to connect to mongoDB. Error: ${error}.`
      );
      reject(err);
    });
  });
}
