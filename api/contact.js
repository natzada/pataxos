const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  const { email, message } = req.body;

  // Configuração do transporte de e-mail (Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // Configuração do e-mail
  const mailOptions = {
    from: email,
    to: 'naatzada.ay@gmail.com', // Seu email
    subject: 'Nova Mensagem do Formulário de Contato',
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar o e-mail' });
  }
};

module.exports = (req, res) => {
    if (req.method === 'POST') {
        const { email, message } = req.body;
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'nathalia.yoshioka.dev2024@gmail.com',
            pass: 'fciasdhwoqypptjm',
          },
          debug: true,
          logger: true,
});
        res.status(200).send('Mensagem enviada com sucesso!');
    } else {
        res.status(405).send('Método não permitido');
    }
};

