const { users }  = require("../models");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const foundUser = await users.findOne({ where: { refreshToken: refreshToken } });
    if (!foundUser) {
        console.log('no user found')
        return res.sendStatus(403); //Forbidden 
    }
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) {
                return res.sendStatus(403);
            }
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            console.log(accessToken);
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }