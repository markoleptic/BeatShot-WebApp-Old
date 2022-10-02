require('dotenv').config();
const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username, id: user.id },
    process.env.TOKEN_SECRET
  );
  return accessToken;
};

const createConfToken = (username, email) => {
  const emailToken = sign({
    username: username,
    email: email,
  },process.env.TOKEN_SECRET,
  {
    expiresIn: '15m',
  });
  return emailToken;
}

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });
  try {
    const validToken = verify(accessToken, process.env.TOKEN_SECRET);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, createConfToken, validateToken };