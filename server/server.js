require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
const uuid = require("uuid/v4");
const https = require("https");
const fs = require("fs");

// Setup express app
app.use(express.json());

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());
app.use(cors())

// use JWT auth to secure the api
app.use(jwt());
console.log("authenticated")

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/payment', require('./payment/payment.controller'))
app.use('/aws', require('./aws/aws.controller.js'))

app.use(errorHandler);

const port = process.env.PORT || 5000;
https.createServer({
    key: fs.readFileSync("../../domain.key"),
    cert: fs.readFileSync("../../domain.crt"),
}, app).listen(port, () => console.log(`Server up and running on port ${port}.`))
//app.listen(port, () => console.log(`Server up and running on port ${port}.`));
