import asyncHandler from '../utils/asyncHandler.js';
import * as FormContactValidator from '../validators/FormContactValidator.js';
import { SUCCESS_CODES } from '../utils/constants.js';
import formContactEmail from '../mail/formContactEmail.js';

const sendFormContactEmail = asyncHandler(async (req, res) => {
  const inputData = FormContactValidator.email(req);

  await formContactEmail(inputData);

  res.sendStatus(SUCCESS_CODES.OK);
});

export default sendFormContactEmail;
