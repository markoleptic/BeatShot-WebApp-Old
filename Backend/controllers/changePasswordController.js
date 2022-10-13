const bcrypt = require("bcrypt");
const { users } = require("../models");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const handlePasswordChange = async (req, res) => {
  const { email } = req.body;
  const token = req.params.token;
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
  if (!token) {
    return res.status(400).json("Incorrect or expired link");
  }

  jwt.verify(
    token,
    process.env.RECOV_TOKEN_SECRET,
    async function (error, decodedToken) {
      if (error) {
        return res.status(400).json("Incorrect or expired link");
      }
      try {
        const foundUser = await users.findOne({
          where: {
            [Op.and]: [{ username: decodedToken.username }, { email: email }],
          },
        });
        if (foundUser) {
          if (foundUser.confirmed === false) {
            return res.status(400).json("Email has not been confirmed yet");
          }
          bcrypt.hash(req.body.password, saltRounds)
          .then((hashedPassword) => {
            users.update(
              { password: hashedPassword },
              { where: { username: decodedToken.username } }
            );
          })
          .then(() => {
            res.status(200).json("Password successfully changed")
          });
        }
        else {
          return res.status(400).json("Invalid email");
        }
      } catch (error) {
        console.log(error);
        return res.status(400).json("Incorrect or expired link");
      }
    }
  );
};

module.exports = { handlePasswordChange };
