import app from '../app.js';
import logger from './logger.js';

const PORT = process.env.PORT || 3333;

export default function expressConfig() {
  return new Promise((resolve, reject) => {
    const server = app.listen(PORT, (err) => {
      if (err) {
        reject(err);
      } else {
        logger.info(
          `✅ Server started at port ${PORT} and with a process pid ${process.pid}`
        );
        resolve(server);
      }
    });
  });
}
