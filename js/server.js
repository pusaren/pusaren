const express = require('express');
const app = express();
const port = 3000;

// Serve static files like your HTML, CSS, and JS
app.use(express.static('public'));

// Define the root route (this is the path `/`)
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'C:\Users\pusaren\Desktop\portfolio\index.html');
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files like your HTML, CSS, and JS
app.use(express.static('public'));

// Contact form route (POST)
app.post('/submit-contact', (req, res) => {
  const { name, email, message } = req.body;

  // Set up the transporter for Nodemailer (using Gmail as an example)
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this based on your email provider
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password'
    }
  });

  // Set up email data
  const mailOptions = {
    from: email,
    to: 'your-email@example.com', // Your email address
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error sending email');
    }
    console.log('Email sent: ' + info.response);
    res.status(200).send('Message sent successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

