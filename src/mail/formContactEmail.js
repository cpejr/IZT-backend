import Email from '../config/nodemailer.js';
import template from './template.js';

export default function formContactEmail(inputData) {
  const body = `
  <h2>Olá Luiz! Um nova submissão do formulário de contato foi realizada no sistema da IZT. Segue informações:</h2>
  <table>
    <tr>
      <td>Companhia: </td>
      <td>${inputData.company}</td>
    </tr>

    <tr>
      <td>E-mail: </td>
      <td>${inputData.email}</td>
    </tr>

    <tr>
      <td>Telefone: </td>
      <td>${inputData.telephone}</td>
    </tr>

    <tr>
      <td>Messagem: </td>
      <td>${inputData.message}</td>
    </tr>
  </table>
  `;

  const mailOptions = {
    to: process.env.EMAIL_TO,
    subject: '[IZT] - Formulário de contato',
    text: `
    Olá Luiz! Aqui vão informações do formulário de contate-nos do IZT. 
    Companhia: ${inputData.company}. E-mail: ${inputData.email}. 
    Telefone: ${inputData.telephone}. Messagem: ${inputData.message}.
    `,
    html: template(body),
  };

  return Email.sendEmail(mailOptions);
}
