const express = require("express");
//const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const stripe = require("stripe")("insert stripe secret key here");
const cors = require('cors')
const uuid = require("uuid/v4");

// Setup express app
const app = express();

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());
app.use(cors())
// app.use((req, res, next) => {
//     res.send('Welcome to Express');
// });

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// next();
// });
// Configure Mongo
// const db = "mongodb://localhost/313-demo-mern-db";

// Connect to Mongo with Mongoose
// mongoose.connect(
//         db,
//         { useNewUrlParser: true }
//     )
//     .then(() => console.log("Mongo connected"))
//     .catch(err => console.log(err));

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

app.post("/changetemplate", async(req, res) => {
    console.log("Request: change template")

    let error;
    let status;

    try {
        var fs = require('fs');
        fs.writeFile(
            '../src/views/TemplateDigitalMemory/temp.txt',
            JSON.stringify(req.body["layout"]),
            function(err){
                if (err) throw err;
                console.log("Template changed!")
            }
        );
    } catch (error) {
        console.error("Error: ", error);
        status = "failure";
    }

    res.json({error, status});
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}.`));
