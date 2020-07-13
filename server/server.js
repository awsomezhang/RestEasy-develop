require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');

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

// api routes
app.use('/users', require('./users/users.controller'));

app.use(errorHandler);

// Configure Mongo

// loading my personal URI for testing purposes. Keep file private (.gitignore)
// var mongoCreds = require('./mongoCreds.json');

// mongoose.connect(
//     mongoCreds.URI, { 
//         useNewUrlParser: true, 
//         useCreateIndex: true 
//     }
// );

// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

// Specify the Port where the backend server can be accessed and start listening on that port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}.`));