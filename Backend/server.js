require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require("./models");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

// middleware
app.use(express.json());
app.use(cookieParser());

const loginRoute = require('./routes/login');
const patchnotesRoute = require('./routes/patchnotes');
const registerRoute = require('./routes/register');
app.use("/login", loginRoute);
app.use("/patchnotes", patchnotesRoute);
app.use("/register", registerRoute);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log("App is listening on port " + port);
    });
});