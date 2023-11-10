const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (subject, message, send_to, send_from, reply_to) => {

    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    
    
    const  options = {
            from: "collegeconnect121@gmail.com",
            to: send_to,
            replyTo: reply_to,
            subject: "New Job Posted on College Connect",
            html: `<h1>New Job Posted!</h1>
                <p>you have posted a new job!</p>
                <p>${message}</p>`
        };
    

    transporter.sendMail(options, function (err, info) {
        if (err) {
            console.log("Error sending email", err);
        } else {
            console.log(info);
        }
    });
};

module.exports = sendEmail;
