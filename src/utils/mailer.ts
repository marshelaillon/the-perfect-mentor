import nodemailer, { SendMailOptions } from 'nodemailer';

// async function createTestCreds() {
//   const creds = await nodemailer.createTestAccount();
//   console.log({ creds });
// }

// createTestCreds();

const { SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT } = process.env;

const smtp = {
  user: SMTP_USER,
  pass: SMTP_PASS,
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: false,
};

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: {
    user: smtp.user,
    pass: smtp.pass,
  },
});

export default async function sendEmail(payload: SendMailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(payload, (err, info) => {
      if (err) {
        console.log(err, 'Error sending email');
        reject(err);
      }
      const previewURL = nodemailer.getTestMessageUrl(info);
      resolve(previewURL);
    });
  });
}
