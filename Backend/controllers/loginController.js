const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users } = require("../models");
const { Op } = require("sequelize");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { username, email, password } = req.body;
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
      return res.status(400).json("not confirmed");
    }
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      // create JWTs
      const accessToken = jwt.sign(
        { username: foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15s" }
      );
      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );

      // Saving refreshToken with current user
      await users.update(
        { refreshToken: refreshToken },
        { where: { username: username } }
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ username, accessToken });
    } else {
      res.sendStatus(401);
    }
  }
};

module.exports = { handleLogin };
