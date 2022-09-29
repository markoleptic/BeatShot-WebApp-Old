const db = require("../config/databaseconfig")
const bcrypt = require('bcrypt');

module.exports = {
    post : (req,res) => {
        const username = req.body.username;
        const email = req.body.email;
        db.query(
                "SELECT * FROM user WHERE username = ? OR email = ?",
                [username, email],
                (err,result) => {
                    if (err) {
                        res.send({err:err});
                    }
                if (result.length > 0) {
                    bcrypt.compare(req.body.password, result[0].hash, (error,response) => {
                        if (error) {
                            res.send({ message : "Wrong username/password combination"});
                        }
                    })
                }
                else {
                    res.send({ message : "User doesn't exist"});
                }
            }
        );
    }
}