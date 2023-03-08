import multer from 'multer';
import multerS3 from 'multer-s3';
import crypto from 'node:crypto';
import s3 from './S3/awsS3.js';
import numToMegaBytes from '../utils/files/numToMegaBytes.js';
import { BadRequest } from '../errors/baseErrors.js';

export default function createUploaderMiddleware({
  bucket = process.env.AWS_BUCKET_NAME,
  acl = 'public-read',
  allowedMimes,
  sizeLimitInMB,
  fields,
}) {
  const metadata = (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  };

  const storage = multerS3({
    s3,
    bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl,
    metadata,
    key: (req, file, cb) => {
      const bytesNumber = 16;
      crypto.randomBytes(bytesNumber, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, `iztweb/${fileName}`);
      });
    },
  });

  const fileFilter = (req, file, cb) => {
    const mimeTypeIsValid = allowedMimes.includes(file.mimetype);

    if (!mimeTypeIsValid)
      return cb(new BadRequest(`${file.fieldname} mime type is invalid`));

    return cb(null, true);
  };

  return multer({
    storage,
    limits: { fileSize: numToMegaBytes(sizeLimitInMB) },
    fileFilter,
  }).fields(fields);
}
