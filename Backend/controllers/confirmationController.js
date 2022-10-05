require("dotenv").config();
const { users }  = require("../models");
const jwt = require("jsonwebtoken");

const handleConfirmation = async (req, res) => {
    const token = req.params.token;
    if (token) {
      jwt.verify(token, 
        process.env.CONF_TOKEN_SECRET,
        function(err , decodedToken) {
        if (err) {
          return res.status(400).json("Incorrect or expired link");
        }
        users.update({ confirmed: true }, { where: { username: decodedToken.username } });
        return res.redirect(process.env.REDIRECT_URL);
      });
      
    } else {
      return res.json("Something went wrong");
     }
  };

module.exports = {handleConfirmation};