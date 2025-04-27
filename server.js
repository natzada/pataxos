// require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = 3000;

// Configurar middleware para parsing de dados do formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir arquivos estáticos (HTML, CSS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir a página inicial
app.get('/', (req, res) => {
    console.log('Acessando a rota /');
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});



// Configurar o transporte de email (usando Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nathalia.yoshioka.dev2024@gmail.com',
        pass: 'fciasdhwoqypptjm',
    },
    debug: true,
    logger: true,
});


// Rota para processar o formulário
app.post('/contact', (req, res) => {
    console.log('Dados recebidos do formulário:', req.body); // Log para depuração
    const { email, message, honeypot } = req.body;

    // Verificar honeypot (anti-spam)
    if (honeypot) {
        return res.status(400).send('Spam detectado');
    }

    // Validar entradas
    if (!email || !message) {
        return res.status(400).send('Erro: Todos os campos são obrigatórios.');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).send('Erro: Endereço de email inválido.');
    }

    // Configurar o email
    const mailOptions = {
        from: 'nathalia.yoshioka.dev2024@gmail.com', // Seu email Gmail
        to: 'naatzada.ay@gmail.com', // Email onde receberá as mensagens
        replyTo: email,
        subject: 'Nova Mensagem do Formulário de Contato',
        text: `Você recebeu uma nova mensagem:\n\nEmail: ${email}\nMensagem: ${message}`,
    };

    // Enviar o email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar email:', error); // Log detalhado
            return res.status(500).send(`Erro: Não foi possível enviar o email. Detalhes: ${error.message}`);
        }
        console.log('Email enviado:', info.response);
        res.redirect('/#contact-us');
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// app.get('/teste-email', (req, res) => {
//     transporter.sendMail({
//         from: 'nathalia.yoshioka.dev2024@gmail.com',
//         to: 'naatzada.ay@gmail.com',
//         subject: 'Teste rápido de email',
//         text: 'Isso é um teste de envio manual via rota /teste-email',
//     }, (error, info) => {
//         if (error) {
//             console.error(error);
//             return res.send('Erro: ' + error.message);
//         }
//         res.send('Email enviado com sucesso! ' + info.response);
//     });
// });
