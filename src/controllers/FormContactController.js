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
      font-size: 20px;
      font-weight: bold;
      font-family: Arial, sans-serif;
    }
    h2 {
      font-size: 15px;
      font-family: Arial, sans-serif;
      font-weight: 400px;
    }
  
    </style>
    <img src="https://preview.redd.it/ipjd0lwzdfla1.png?width=960&crop=smart&auto=webp&v=enabled&s=e2f89f34e0a81b726e164109b775d7b1e8599909" alt="My Company Logo" width="50" height="50">
    <h1>These are the informations about a new client</h1>
    <h2>Hi Luiz! These are your new client informations!</h2>

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
