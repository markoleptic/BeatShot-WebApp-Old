const { users } = require("../models");
const nodemailer = require("nodemailer");
const aws = require("@aws-sdk/client-ses")
const jwt = require("jsonwebtoken");

const config = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: "us-east-1",
};

const ses = new aws.SES(config)
// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
  SES: {ses, aws}
});

const sendConfEmail = async (user, emailToken) => {
  const url = `${process.env.CLIENT_URL}/confirmation/${emailToken}`;
  transporter
    .sendMail({
      from: "support@beatshot.gg",
      to: `${user.email}`,
      subject: "BeatShot - Email Confirmation",
      html: `Hello, ${user.username}. Please click <a href="${url}">this link</a> to confirm your email.`,
    })
    .then(function (info) {
      console.log(info.messageId);
      return;
    })
    .catch(function (err) {
      console.log(err);
    });
};

// used for one time email confirmation
const createConfToken = async (user) => {
  const confToken = jwt.sign(
    { username: user.username },
    process.env.CONF_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  return confToken;
};

const handleResend = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json("Email Required");
  }
  const foundUser = await users.findOne({ where: { email: email } });
  if (foundUser) {
    try {
      createConfToken(foundUser).then((confToken) => {
        sendConfEmail(foundUser, confToken);
        return res.json("email sent");
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json("Something went wrong");
    }
  } else {
    return res.status(401).json("No Account with this email was found");
  }
};

module.exports = { handleResend };
