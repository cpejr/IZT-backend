import path from 'node:path';
import crypto from 'node:crypto';
import multer from 'multer';
import fileDirName from '../utils/fileDirName.js';

const { __dirname } = fileDirName(import.meta.url);

const multerConfig = {
  dest: path.resolve(__dirname, '../../temp/uploads'), // default
  storage: multer.diskStorage({
    destination: (req, file, cb) =>
      cb(null, path.resolve(__dirname, '../../temp/uploads')),
    filename: (req, file, cb) => {
      const bytesNumber = 16;
      crypto.randomBytes(bytesNumber, (err, hash) => {
        if (err) cb(err);

        // eslint-disable-next-line no-param-reassign
        file.key = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, file.key);
      });
    },
  }),
};

const uploader = multer(multerConfig);
export default uploader;
