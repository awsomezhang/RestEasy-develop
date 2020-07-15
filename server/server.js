require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
const stripe = require("stripe")("insert stripe secret key here");
const uuid = require("uuid/v4");

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

  
app.post("/checkout", async (req, res) => {
    console.log("Request:", req.body);

    let error;
    let status;
    try {
        const { product, token } = req.body;

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const idempotency_key = uuid();
        const charge = await stripe.charges.create(
            {
                amount: 100,
                currency: "usd",
                customer: customer.id,
                receipt_email: token.email,
                description: `Purchased the RestEasy memorial`,
                shipping: {
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip
                    }
                }
            },
            {
                idempotency_key
            }
        );
        console.log("Charge:", { charge });
        status = "success";
    } catch (error) {
        console.error("Error:", error);
        status = "failure";
    }

    res.json({ error, status });
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}.`));