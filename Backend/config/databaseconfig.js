const mysql = require("mysql");

const db = mysql.createConnection({
    user:"root",
    host: "localhost",
    password: "cs3203",
    database: "loginsystem",
});

module.exports = db;