const express = require("express");
const router = express.Router();
const db = require("../models");
const { users } = require("../models");
const bcrypt = require("bcrypt");
const { createTokens } = require("../jwt");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await users.findOne({ where: { username: username } });
  if (!user) {
    res.
    status(400)
    .json({ message: "User Doesn't Exist" });
  } else {
    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
        res
          .status(400)
          .json({ message: "Wrong Username and password combination" });
      } else {
        const accessToken = createTokens(user);
        res.cookie("accessToken", accessToken, {
          maxAge: 60 * 60 * 24 * 1000,
          httpOnly: true,
        });
        res.json("Logged in");
      }
    });
  }
});

module.exports = router;

// db.query(
//     "SELECT * FROM user WHERE username = ? OR email = ?",
//     [username, email],
//     (err,result) => {
//         if (err) {
//             res.send({err:err});
//         }
//     if (result.length > 0) {
//         bcrypt.compare(req.body.password, result[0].hash, (error,response) => {
//             if (error) {
//                 res.send({ message : "Wrong username/password combination"});
//             }
//         })
//     }
//     else {
//         res.send({ message : "User doesn't exist"});
//     }
// }
// );
