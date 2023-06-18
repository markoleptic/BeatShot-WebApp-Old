require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const db = require("./models");
const cors = require("cors");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");

//  handle credentials check
app.use(credentials);
// Cross Origin Resource Sharing
app.use(cors(corsOptions));
// middleware for json
app.use(express.json());
// middleware for cookies
app.use(cookieParser());

// all routes that don't require being logged in
app.use("/api/login", require("./routes/login"));
app.use("/api/patchnotes", require("./routes/patchnotes"));
app.use("/api/register", require("./routes/register"));
app.use("/api/confirmation", require("./routes/confirmation"));
app.use("/api/refresh", require("./routes/refresh"));
app.use("/api/logout", require("./routes/logout"));
app.use("/api/recoveraccount", require("./routes/recoverAccount"));
app.use("/api/changepassword", require("./routes/changePassword"));
app.use("/api/resendconfemail", require("./routes/resendConfEmail"));
app.use("/api/sendfeedback", require("./routes/sendFeedback"));
app.use(verifyJWT);
app.use("/api/profile", require("./routes/profile"));

// all routes that require being logged in
// NOT CURRENTLY IMPLEMENTED


db.sequelize.sync()

app.listen(port, () => {
  console.log("App is listening on port " + port);
});
