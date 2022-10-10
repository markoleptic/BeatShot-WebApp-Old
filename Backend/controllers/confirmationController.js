require("dotenv").config();
const { users } = require("../models");
const jwt = require("jsonwebtoken");

const handleConfirmation = async (req, res) => {
  const token = req.params.token;
  if (!token) {
    return res.status(400).json("Incorrect or expired link");
  }
  jwt.verify(
    token,
    process.env.CONF_TOKEN_SECRET,
    async function (err, decodedToken) {
      if (err) {
        return res.status(400).json("Incorrect or expired link");
      }
      try {
        foundUser = await users.findOne({
          where: { username: decodedToken.username },
        });
        if (foundUser.dataValues.confirmed === false) {
          await users.update(
            { confirmed: true },
            { where: { username: decodedToken.username } }
          );
          return res.status(200).json("Confirmation success");
        } else if (foundUser.dataValues.confirmed === true) {
          return res.status(204).json("Email already confirmed");
        } else {
          return res.status(400).json("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    }
  );
};

module.exports = { handleConfirmation };
