const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Define your contact form route
app.post("/submit-form", (req, res) => {
  const { name, email, phone, message } = req.body;

  // Set up a transporter to send emails (using Nodemailer)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // replace with your email
      pass: 'your-email-password' // replace with your email password
    }
  });

  // Email options
  let mailOptions = {
    from: email,
    to: 'your-email@gmail.com', // replace with the email that will receive submissions
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error in form submission.");
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send("Form submitted successfully!");
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
