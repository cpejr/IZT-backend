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
    html: `
    <style>
    h1 {
      font-size: 24px;
      font-weight: bold;
    }
    </style>

    <h1>These are the informations about a new client</h1>
    <table>
      <tr>
        <td>Company: </td>
        <td>${inputData.company}</td>
      </tr>

      <tr>
        <td>Email: </td>
        <td>${inputData.email}</td>
      </tr>

      <tr>
        <td>Telephone: </td>
        <td>${inputData.telephone}</td>
      </tr>

      <tr>
        <td>Message: </td>
        <td>${inputData.message}</td>
      </tr>
    </table>
  `,
  };
  await Email.sendEmail(mailOptions);
  res.sendStatus(SUCCESS_CODES.OK);
});

export default sendFormContactEmail;
