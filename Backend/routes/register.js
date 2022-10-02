const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const { users } = require("../models");
const saltRounds = 10;

router.post("/", async (req, res) => {
  const { username, email } = req.body;
  //const alreadyExistsUser = await users.findOne({ where: { email } });
  //if (alreadyExistsUser) {
  //  return res.status(400).json({ message: "User with email already exists." });
 // }

  // check to see if password has one number, one uppercase, one lowercase, between 8-20 chars
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/.test(req.body.password)
  ) {
    return res.status(400).json({
      message:
        "Password needs atleast one number, one uppercase, and one lowercase letter",
    });
  }

  bcrypt.hash(req.body.password, saltRounds).then((hash) => {
    users
      .create({
        username: username,
        email: email,
        password: hash,
      })
      .then(() => {
        res
        .json("User registered. Please check your email for verification.");
      })
      .catch((err) => {
        if (err) {
          const errObj = {};
          err.errors.map((er) => {
            errObj[er.path] = er.message;
          });
          res.status(400).json(errObj);
        }
      });
  });
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
