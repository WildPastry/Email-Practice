"use strict";
require('dotenv').config();
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let account = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        service: "Gmail",
        // host: "smtp.gmail.com",
        auth: {
            // user: 'mykdsn@gmail.com', // generated ethereal user
            // pass: '' // generated ethereal password
            // type: "login",
            user: process.env.GMAIL_USER, // generated ethereal user
            pass: process.env.GMAIL_PASS // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Mike" <mykdsn@gmail.com>', // sender address
        to: "mykdsn@gmail.com", // list of receivers
        subject: "Test", // Subject line
        text: "Email Test", // plain text body
        // html: "<b>Email Test</b>" // html body
        html: {path: 'mail.html'} // html body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions)

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);