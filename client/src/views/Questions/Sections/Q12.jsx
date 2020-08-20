import React from "react";
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import { toast } from "react-toastify";
import {Button, notification} from "antd";
import * as constants from "../../../constants";
import "../Questions.css"
//import {saveStripeToken} from "../QuestionsAPI";

import "react-toastify/dist/ReactToastify.css";


toast.configure();

export default class Q12 extends React.Component {

    handleToken = async(token, addresses) => {

        console.log(token, addresses )

        const jwt = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        }
        console.log("token: " + jwt)
        const response = await axios.post(
            constants.REMOTE_HOST+"/payment/checkout",
            { token }, config

        );
        const { message } = response.data;
        console.log("Response:", message);
        if (message === "success") {
            toast("Success! Check email for details", { type: "success" });
            this.props.next();
        } else {
            toast("Something went wrong", { type: "error" });
        }

    };


    render() {
        const checkout_button = {
            width: "150px", 
            height: "70px", 
            padding: "10px", 
            textAlign: "center",
            borderRadius: "10px"
        }
        return (
            <div style={{width: "100%", textAlign: "center"}}>
                <div className="create-text" style={{fontSize: "1.5em", marginBottom: "0.5em"}}>
                    Contribute using credit card
                </div>
                <div className="create-text" style={{fontStyle: "italic", fontSize: "1em"}}>
                    PayPal and Venmo coming soon
                </div>
                <br/>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <StripeCheckout
                        token={this.handleToken}
                        stripeKey={constants.STRIPE_PUBLIC_KEY}
                        amount={5000} // cents
                        name="RestEasy Memorial Page"
                        description="Create a digital memorial"
                        image="/logo196.png" // the pop-in header image (default none)
                        billingAddress
                        shippingAddress
                    > 
                    <button type="primary" className="upload">Pay With Card</button>
                    </StripeCheckout>
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button type="primary" onClick={this.props.prev} style={{ borderRadius: "10px", margin: "5px" }}>Back</Button>
                    {/* <Button type="primary" onClick={this.props.next} style={{ borderRadius: "10px", margin: "5px" }}>Continue (REMOVE THIS IN FINAL PRODUCT)</Button> */}
                </div>
            </div>);
    }
}
