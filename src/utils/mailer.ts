import * as nodeMailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();
const mailConfig = require('./mail.config')

exports.sendMail = (to, subject, htmlContent) => {
  const transport = nodeMailer.createTransport({
    host: mailConfig.HOST,
    port: mailConfig.PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: mailConfig.USERNAME, // generated ethereal user
      pass: mailConfig.PASSWORD, // generated ethereal password
    },
  })
  const options = {
    from: mailConfig.FROM_ADDRESS,
    to: to,
    subject: subject,
    html: htmlContent
  }
  return transport.sendMail(options);
}
