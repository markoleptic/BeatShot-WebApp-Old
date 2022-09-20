const Joi = require('joi');
const http = require('http');
const https = require('https');
const fs = require("fs");
const express = require('express');
const app = express();

// middleware
app.use(express.json());

// const courses = [
//     {id: 1, name: 'course1'},
//     {id: 2, name: 'course2'},
//     {id: 3, name: 'course3'}
// ]

app.get('/', (req,res) => {
    res.send('BeatShot website under construction');
});

// app.get('/api/courses', (req,res) => {
//     res.send(courses);
// });

// app.get('/api/courses/:id', (req,res) => {
//     const course = courses.find(c => c.id === parseInt(req.body.id))
//     if (!course) {
//         res.status(404).send('The course with given id not found')
//     }
//     res.send(course);
// });

// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.query);
// });

// app.post('/api/courses', (req,res) => {
//     const { error } = validateCourse(req.body);
//     if (error) {
//         res.status(400).send(error.details[0].message);
//         return;
//     }
//     const course = {
//         id: courses.length + 1,
//         name: req.body.name
//     };
//     courses.push(course);
//     res.send(course);
// })

// app.put('/api/courses/:id', (req,res) => {
//     const course = courses.find(c => c.id === parseInt(req.body.id))
//     if (!course) {
//         return res.status(404).send('The course with given id not found') 
//     }
//     //object destructuring
//     const { error } = validateCourse(req.body);
//     if (error) {
//         return res.status(400).send(error.details[0].message);
//     }

//     course.name = req.body.name;
//     res.send(course);
// })

// app.delete('/api/courses/:id', (req,res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if (!course) {
//         return res.status(404).send('The course with given id not found')
//     }
//     const index = courses.indexOf(course)
//     courses.splice(index, 1);
//     res.send(course);
// })

https.createServer(app).listen(443);

// file location of private key
var privateKey = fs.readFileSync( '/home/ec2-user/beatshot_gg/private.pem' );

// file location of SSL cert
var certificate = fs.readFileSync( '/home/ec2-user/beatshot_gg/certificate.pem' );

var server_config = {
    key : privateKey,
    cert: certificate
};

var https_server = https.createServer(server_config, app).listen(443, function(err){
    console.log("Node.js Express HTTPS Server Listening on Port 443");
});

var http_server = http.createServer(function(req,res){    
    // 301 redirect (reclassifies google listings)
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80, function(err){
    console.log("Node.js Express HTTPS Server Listening on Port 80");    
});

//const port = process.env.PORT || 3000;
//app.listen(port, () => console.log(`Listing on port ${port}`));

/* to set environment variable, in console you can:
export PORT = 5000

use let if defining variable that gets redifined later
*/

// function validateCourse(course) {
//     const schema = Joi.object(
//         {
//         name: Joi.string()
//         .min(3)
//         .required(),
//     });
//     return schema.validate(course);
// }