const { users } = require("../models");
const nodemailer = require("nodemailer");
const aws = require("@aws-sdk/client-ses")
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

const sendRecoveryEmail = async (user, emailToken) => {
  const url = `${process.env.CLIENT_URL}/recover/${emailToken}`;
  transporter
    .sendMail({
      from: "support@beatshot.gg",
      to: `${user.email}`,
      subject: "BeatShot - Password Change",
      html: `Hello, ${user.username}. Please click <a href="${url}">this link</a> to change your password.`,
    })
    .then(function (info) {
      console.log(info.messageId);
      return;
    })
    .catch(function (err) {
      console.log(err);
    });
};

const createRecoveryToken = async (user) => {
  const recoveryToken = jwt.sign(
    { username: user.username },
    process.env.RECOV_TOKEN_SECRET,
    { expiresIn: "5m" }
  );
  return recoveryToken;
};

const handleRecovery = async (req, res) => {
  const { email } = req.body;
  const foundUser = await users.findOne({ where: { email: email } });
  if (foundUser) {
  createRecoveryToken(foundUser).then((recoveryToken) => {
    sendRecoveryEmail(foundUser, recoveryToken);
    return res.json("email sent");
  });
}
else {
  return res.status(401).json("No Account with this email was found");
}
};

module.exports = { handleRecovery };
