const nodemailer = require("nodemailer");
const aws = require("@aws-sdk/client-ses");

const config = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: "us-east-1",
};

const ses = new aws.SES(config);
// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

const sendFeedbackEmail = async (title, content) => {
  transporter
    .sendMail({
      from: "support@beatshot.gg",
      to: "support@beatshot.gg",
      subject: `Feedback: ${title}`,
      html: `${content}`,
    })
    .then(function (info) {
      console.log(info.messageId);
      return;
    })
    .catch(function (err) {
      console.log(err);
    });
};

const handleSendFeedback = async (req, res) => {
  try {
    sendFeedbackEmail(req.body.title, req.body.content);
    return res.status(200).json("email sent");
  } catch (err) {
    console.log(err);
    return res.status(401).json("Invalid Feedback");
  }
};

module.exports = { handleSendFeedback };
