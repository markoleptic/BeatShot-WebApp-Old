const bcrypt = require("bcrypt");
const { users }  = require("../models");
const saltRounds = 10;
const nodemailer = require("nodemailer");
const aws = require("@aws-sdk/client-ses")
const jwt = require("jsonwebtoken");
require('dotenv').config();

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
      html: `Please click <a href="${url}">this link</a> to confirm your email.`,
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
    const confToken = jwt.sign({ username: user.username }, process.env.CONF_TOKEN_SECRET, {expiresIn: "1h"});
    return confToken;
  };

const handleNewUser = async (req, res) => {
  const { username, email } = req.body;
  // check to see if password has one number, one uppercase, one lowercase, between 8-20 chars
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/.test(req.body.password)
  ) {
    return res
      .status(400)
      .json(
        "Password needs atleast one number, one uppercase, and one lowercase letter"
      );
  }
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  users.create({
      username: username,
      email: email,
      password: hashedPassword,
      refreshToken: "none",
    })
    .then((user) => {
      createConfToken(user)
      .then((confToken) => {
        sendConfEmail(user, confToken);
        return res.json("User registered. Please check your email for verification.");
      });
    })
    .catch((err) => {
      const errObj = {};
      err.errors.map((er) => {
        errObj[er.path] = er.message;
      });
      return res.status(400).json(errObj);
    });
};

module.exports = {handleNewUser};