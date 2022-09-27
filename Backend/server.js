// const express = require('express');
// const mysql = require('mysql');
// const Chart = require('chart.js');

// const app = express();

// var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "cs3203",
//     database: "test_db",
//     port: "3306"
// })

// app.get('/',(req,res) => {

// })

// connection.connect((err) => {
//     if (err) {
//         throw err
//     }
//     else {
//         console.log("Connected")
//     }
// })

// connection.query('CREATE TABLE tabletest(id INT(255) UNSIGNED AUTO_INCREMENT PRIMARY KEY, thing VARCHAR(255) NOT NULL)', (err,rows) => {
//     if(err) {
//         throw err
//     }
//     else {
//         console.log("DATA SENT BOIS")
//         console.log(rows)
//     }
// })



const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port)