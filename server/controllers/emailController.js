const nodemailer=require("nodemailer")
require("dotenv").config();
const sendEmail=async(subjects,message,send_to,send_from,reply_to)=>{

    const transporter =nodemailer.createTransport({

        host:process.env.HOST,
        port:"587",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASS,
        },
        tls:{
            rejectUnauthorized:false,
        }
    })
    const options={
        from:"collegeconnect121@gmail.com",
        to:send_to,
        replyTo:reply_to,
        subject:"One time password for College Connect",
        html:`<h1>Welcome to college connct </h1>
        <h2>Connect with your college friends and interact with them at one place </h2>Your otp for login is ${message}`
    }
    //send email
    transporter.sendMail(options,function(err,info){
        if(err){
            console.log("error email send",err)
        }else{
            console.log(info)
        }
    })
}
module.exports=sendEmail










/*
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (subject, message, send_to, send_from, reply_to, isJob = false) => {

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

    let options;
    if (isJob) {
        options = {
            from: "collegeconnect121@gmail.com",
            to: send_to,
            replyTo: reply_to,
            subject: "New Job Posted on College Connect",
            html: `<h1>New Job Posted!</h1>
                <p>you have posted a new job!</p>
                <p>${message}</p>`
        };
    } else {
        options = {
            from: "collegeconnect121@gmail.com",
            to: send_to,
            replyTo: reply_to,
            subject: "One time password for College Connect",
            html: `<h1>Welcome to College Connect</h1>
                <h2>Connect with your college friends and interact with them at one place</h2>Your OTP for login is ${message}`
        };
    }

    transporter.sendMail(options, function (err, info) {
        if (err) {
            console.log("Error sending email", err);
        } else {
            console.log(info);
        }
    });
};

module.exports = sendEmail;
*/