import multer from 'multer';
// import crypto from 'node:crypto';
// import multerS3 from 'multer-s3';
// import numToMegaBytes from '../utils/files/numToMegaBytes.js';
// import s3 from './S3/awsS3';
// import { BadRequest } from '../errors/BaseErrors';

const uploader = multer({ storage: multer.memoryStorage() });
export default uploader;

// export function createUploader({
//   bucket = process.env.AWS_BUCKET_NAME,
//   acl = 'public-read',
//   fileSizeMB,
//   allowedMimes,
// }) {
//   const storage = multerS3({
//     s3,
//     bucket,
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     acl,
//     key: (req, file, cb) => {
//       const bytesNumber = 16;
//       crypto.randomBytes(bytesNumber, (err, hash) => {
//         if (err) cb(err);

//         const fileName = `${hash.toString('hex')}-${file.originalname}`;
//         cb(null, fileName);
//       });
//     },
//   });

//   const limits = (req, file, cb) => {
//     if (file.size <= numToMegaBytes(fileSizeMB)) {
//       cb(null, true);
//     } else {
//       cb(new BadRequest());
//     }
//   };
//   const fileFilter = (req, file, cb) => {
//     if (allowedMimes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new BadRequest('Invalid file type.'));
//     }
//   };

//   return multer({ storage, limits, fileFilter });
// }
