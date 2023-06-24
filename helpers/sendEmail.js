const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "anna_kon@bigmir.net" };
  await sgMail.send(email);
  return true;
};

// const data = {
//   to: "anna_kon@ukr.net", // Change to your recipient
//   from: "anna_kon@bigmir.net", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };

module.exports = sendEmail;
