require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./models");
const cookieParser = require("cookie-parser");

// middleware
app.use(express.json());
app.use(cookieParser());

const loginRoute = require("./routes/login");
const patchnotesRoute = require("./routes/patchnotes");
const registerRoute = require("./routes/register");
const confirmationRoute = require("./routes/confirmation");
app.use("/api/login", loginRoute);
app.use("/api/patchnotes", patchnotesRoute);
app.use("/api/register", registerRoute);
app.use("/api/confirmation", confirmationRoute);


db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("App is listening on port " + port);
  });
});
