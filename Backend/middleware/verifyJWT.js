require("dotenv").config();
const jwt = require("jsonwebtoken");

// used to validate every generic token
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      console.log('authHeader exists');
      const accessToken = authHeader.split(" ")[1];
      console.log(accessToken);
      if (accessToken == null) return res.sendStatus(401).json("Not Authenticated");
      jwt.verify(accessToken,
        process.env.ACCESS_TOKEN_SECRET, 
        (err, decoded) => {
        if (err) return res.sendStatus(403).json("Invalid token");
        req.user = decoded.username;
        next();
      });
    } else {
      res.status(401).json("Not Authenticated");
    }
  };

  module.exports = verifyJWT;