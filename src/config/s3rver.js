import path from 'node:path';
import S3rver from 's3rver';
import logger from './logger.js';
import fileDirName from '../utils/fileDirName.js';

const { __dirname } = fileDirName(import.meta.url);

export default function s3rverConfig() {
  return new Promise((resolve, reject) => {
    const instance = new S3rver({
      port: 4569,
      address: 'localhost',
      silent: false,
      directory: path.resolve(__dirname, '../../temp/uploads'),
      resetOnClose: true,
      configureBuckets: [
        {
          name: process.env.AWS_BUCKET_NAME,
        },
      ],
    });

    instance.run((error, { address, port } = {}) => {
      if (error) {
        const err = new Error(
          `❌ Failed to connect to S3rver. Error: ${error}.`
        );
        reject(err);
      } else {
        logger.info(
          `✅ Established connection with S3rver at address ${address} and port ${port}`
        );
        resolve();
      }
    });
  });
}
