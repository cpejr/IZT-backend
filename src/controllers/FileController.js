import FileModel from '../models/FileModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import * as FileValidator from '../validators/FileValidator.js';
import { SUCCESS_CODES } from '../utils/constants.js';

// eslint-disable-next-line import/prefer-default-export
export const download = asyncHandler(async (req, res) => {
  const { _id } = FileValidator.download(req);
  const { name, contentType, buffer } = await FileModel.getOneFile(_id);

  res.attachment(name).type(contentType).status(SUCCESS_CODES.OK).send(buffer);
});
