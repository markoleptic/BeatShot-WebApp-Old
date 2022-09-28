//const Joi = require('joi');
//const http = require('http');
//const https = require('https');
//const fs = require("fs");
import express, { json } from 'express';
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(json());

app.get('/', (req,res) => {
    res.send('BeatShot website under construction');
});

// file location of private key
//var privateKey = fs.readFileSync( '/home/ec2-user/beatshot_gg/private.pem' );

// file location of SSL cert
//var certificate = fs.readFileSync( '/home/ec2-user/beatshot_gg/certificate.pem' );

//var server_config = {
//    key : privateKey,
//    cert: certificate
//};

//var https_server = https.createServer(server_config, app).listen(443, function(err){
//    console.log("Node.js Express HTTPS Server Listening on Port 443");
//});

//var http_server = http.createServer(function(req,res){    
//    // 301 redirect (reclassifies google listings)
//    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
//    res.end();
//}).listen(80, function(err){
//    console.log("Node.js Express HTTPS Server Listening on Port 80");    
//});

app.listen(port);
console.log("App is listening on port " + port)