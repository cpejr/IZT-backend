import asyncHandler from '../utils/asyncHandler.js';
import FormContactValidator from '../validators/FormContactValidator.js';
import { SUCCESS_CODES } from '../utils/constants.js';
import Email from '../config/nodemailer.js';

const sendFormContactEmail = asyncHandler(async (req, res) => {
  const inputData = FormContactValidator(req);
  const mailOptions = {
    to: 'alexandrecenachi@cpejr.com.br',
    subject: '[IZT] - Formulário de contato',
    text: 'Here is the text of the test email',
    html: `<h1>${Object.entries(inputData).toString()}</h1>`,
  };
  await Email.sendEmail(mailOptions);
  res.sendStatus(SUCCESS_CODES.OK);
});

export default sendFormContactEmail;
