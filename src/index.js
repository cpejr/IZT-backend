import 'dotenv/config';
import mongoConfig from './config/mongo.js';
import app from './server.js';

const PORT = process.env.PORT || 3333;
app.listen(PORT, async () => {
  try {
    await mongoConfig();
    console.log(`✅ Server started at port ${PORT}`);
  } catch (err) {
    console.error(err.message, err);
  }
});
