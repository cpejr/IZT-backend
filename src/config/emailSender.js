import nodemailer from 'nodemailer';

export default async function emailSender() {
  const html = `<!DOCTYPE html>
  <html lang="pt-br">
    <head>
      <meta charset="utf-8">
      <title>Exemplo de HTML para e-mail</title>
      <style>
        /* Estilos do corpo do e-mail */
        body {
          font-family: Arial, sans-serif;
          font-size: 14px;
          line-height: 1.5;
          background-color: #f5f5f5;
          padding: 20px;
        }
  
        /* Estilos do cabeçalho do e-mail */
        header {
          background-color: #333;
          color: #fff;
          padding: 10px;
        }
  
        h1 {
          font-size: 24px;
          margin: 0;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>Exemplo de HTML para e-mail</h1>
      </header>
      <p>Olá!</p>
      <p>Este é um exemplo simples de um e-mail em HTML.</p>
      <p>Espero que você goste!</p>
      <footer>
        <p>Atenciosamente,</p>
        <p>Seu nome</p>
      </footer>
    </body>
  </html>`;

  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'f0f56f6562e0f5',
      pass: '9355c48a50abf0',
    },
  });

  // Configurar as opções de envio de e-mail
  const mailOptions = {
    from: 'thiagofraga@cpejr.com.br',
    to: 'destinatario@dominio.com',
    subject: 'Teste de envio de e-mail',
    text: 'Este é um teste de envio de e-mail usando o MailCatcher',
    html: `${html}`,
  };

  // Enviar o e-mail
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`E-mail enviado: ${info.response}`);
    }
  });
}
