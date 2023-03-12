import logger from '../config/logger.js';
import * as awsS3 from '../config/S3/awsS3.js';

// TODO: add suport for multer .single .array .any
const deleteFilesOnError = async (err, req, res, next) => {
  const { files } = req;
  if (!files || !Object.keys(files)) return next(err);

  const filesObjs = Object.values(files).reduce(
    (acc, fileObj) => [...acc, ...fileObj],
    []
  );
  const keys = filesObjs.map(({ key }) => key);

  try {
    await awsS3.deleteFiles(keys);
  } catch (error) {
    logger.error(error, 'Error from the deleteFilesOnError middleware');
  }

  return next(err);
};

export default deleteFilesOnError;
