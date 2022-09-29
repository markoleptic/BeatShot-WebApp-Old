const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const jwt = require('jsonwebtoken');

// middleware
app.use(express.json());

const loginRoute = require('./routes/login');
const patchnotesRoute = require('./routes/patchnotes');
const registerRoute = require('./routes/register');
app.use("/login", loginRoute);
app.use("/patchnotes", patchnotesRoute);
app.use("/register", registerRoute);

app.listen(port);
console.log("App is listening on port " + port)