const {users} = require('../models');

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content

    // Delete refreshToken in db
    users.update({ refreshToken: "none" }, { where: { refreshToken: cookies.jwt } });
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = { handleLogout }