const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require("../config/databaseconfig")
const saltRounds = 10;

router.post('/', (req,res) => {
    const username = req.body.username;
    const email = req.body.email;
    bcrypt.hash(req.body.password, saltRounds, (err,hash) => {
        if (err) {
            console.log(err);
        }
        db.query(
            "INSERT INTO user (username, email, password) VALUES (?,?,?)", 
            [username, email, hash],
            (err,result) => {
                console.log(err);
                console.log(result);
            }
        )
    })
})

module.exports = router;