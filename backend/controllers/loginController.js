const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users } = require("../models");
const { Op } = require("sequelize");
require("dotenv").config();

const handleLogin = async (req, res) => {
  var { username, email, password } = req.body;
  if ((!username && !email) || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const foundUser = await users.findOne({
    where: {
      [Op.or]: [{ username: username }, { email: email }],
    },
  });
  if (foundUser) {
    if (foundUser.confirmed === false) {
      return res.status(400).json('Please confirm your email or request for a resend.');
    }
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      // create short-lived access token
      const accessToken = jwt.sign(
        { username: foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15s" }
      );
      // create long-lived refresh token
      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1825d" }
      );
      // save long-lived refresh token in database
      await users.update(
        { refreshToken: refreshToken },
        { where: { username: foundUser.username } }
      );
      // Send long-lived refresh token as cookie
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 365 * 5 * 1000,
      });
      // Send in body the short-lived access token
      res.status(200).json({username: foundUser.username, accessToken});
    } else {
      res.status(401).json('Incorrect password.');
    }
  }  else {
    res.status(401).json('User not found.');
  }
};

module.exports = { handleLogin };
