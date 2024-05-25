const nodemailer = require("nodemailer");
require("dotenv").config();
const sendEmail = async (subjects, message, send_to, send_from, reply_to) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: "587",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const options = {
    from: "collegeconnect121@gmail.com",
    to: send_to,
    replyTo: reply_to,
    subject: "One time password for Connexa is",
    html: `<h1>Welcome to Connexa</h1>
        <h2>Connect with Connect with professionals and explore the world today </h2>Your otp for login is ${message}`,
  };
  //send email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log("error email send", err);
    } else {
      console.log(info);
    }
  });
};
module.exports = sendEmail;
