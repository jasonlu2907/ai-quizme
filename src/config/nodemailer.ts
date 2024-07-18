import nodemailer from 'nodemailer';

const email = process.env.NODEMAIL_MAIL;
const pass = process.env.NODEMAIL_PASS_KEY; // since the email has 2FA, I need to create a "Application Specific"

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass,
  },
});
