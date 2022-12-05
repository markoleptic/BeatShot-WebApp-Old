require("dotenv").config();
const jwt = require("jsonwebtoken");

// used to validate every generic token
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const accessToken = authHeader.split(" ")[1];
    if (accessToken === null) {
      return res.sendStatus(401).json("Not Authenticated");
    }
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(403).json("Invalid token");
      }
      next();
    });
  } else {
    res.status(401).json("Not Authenticated");
  }
};

module.exports = verifyJWT;
