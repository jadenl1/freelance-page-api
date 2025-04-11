require('dotenv').config();

const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// If you need to parse JSON bodies:
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'terynapp@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});

app.post('/send-project-req', (req, res) => {
    const { to, subject, message } = req.body;

    const mailOptions = {
        from: 'terynapp@gmail.com',
        to,
        subject,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
