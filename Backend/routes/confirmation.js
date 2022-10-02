require("dotenv").config();
const express = require("express");
const router = express.Router();
const { users } = require("../models");
const jwt = require("jsonwebtoken");

router.get("/:token", async (req, res) => {
  const token = req.params.token;
  if (token) {
    jwt.verify(token, process.env.AUTH_TOKEN , function(err , decodedToken) {
      if (err) {
        return res.status(400).json({message : "Incorrect or expired link"});
      }
      else {
        users.update({ confirmed: true }, { where: { username: decodedToken.username, email: decodedToken.email } });
        return res.json({message : "successful verification"});
      }
    });
    
  } else {
    return res.json({message : "Something went wrong"});
   }
});
module.exports = router;
