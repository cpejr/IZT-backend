import FileModel from '../models/FileModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import * as FileValidator from '../validators/FileValidator.js';
import { SUCCESS_CODES } from '../utils/constants.js';
import { NotFoundError } from '../errors/baseErrors.js';

// eslint-disable-next-line import/prefer-default-export
export const download = asyncHandler(async (req, res) => {
  const { _id } = FileValidator.download(req);

  const foundFile = await FileModel.findById(_id).exec();
  if (!foundFile) throw new NotFoundError('File not found');

  const { dataStream, contentType, contentLength } = await FileModel.getOneFile(
    foundFile.key
  );

  res.attachment(foundFile.name).type(contentType).status(SUCCESS_CODES.OK);
  res.set({ 'Content-Length': contentLength });
  dataStream.pipe(res);
});
