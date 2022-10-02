const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("../jwt");
const { users } = require("../models");
const { sign, verify } = require("jsonwebtoken");
const saltRounds = 10;

const nodemailer = require("nodemailer");
var aws = require("aws-sdk");

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
  SES: new aws.SES({
    apiVersion: "2010-12-01",
  }),
});

router.post("/", async (req, res) => {
  const { username, email } = req.body;

  // check to see if password has one number, one uppercase, one lowercase, between 8-20 chars
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/.test(req.body.password)
  ) {
    return res.status(400).json({
      message:
        "Password needs atleast one number, one uppercase, and one lowercase letter",
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const {user} = await users.create({
    username: username,
    email: email,
    password: hashedPassword,
  });
  const emailToken = sign({username, email},
    process.env.AUTH_TOKEN,
    {expiresIn: '20m'});
  const url = `${process.env.CLIENT_URL}/confirmation/${emailToken}`;
  transporter.sendMail(
    {
      from: "support@beatshot.gg",
      to: `${email}`,
      subject: "BeatShot - Email Confirmation",
      html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
    },
    (err, info) => {
      console.log(info.envelope);
      console.log(info.messageId);
    }
  );
  res.json("User registered. Please check your email for verification.");
  (err) => {
    if (err) {
      const errObj = {};
      err.errors.map((er) => {
        errObj[er.path] = er.message;
      });
      res.status(400).json(errObj);
    }
  };
});
module.exports = router;

/*db.query(
    "INSERT INTO user (username, email, password) VALUES (?,?,?)", 
    [username, email, hash],
    (err,result) => {
        console.log(err);
        console.log(result);
    }
)*/
