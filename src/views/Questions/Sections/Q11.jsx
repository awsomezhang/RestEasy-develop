import React from "react";
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import { toast } from "react-toastify";
import {Button, notification} from "antd";
import * as constants from "../../../constants";
//import {saveStripeToken} from "../QuestionsAPI";

import "react-toastify/dist/ReactToastify.css";


toast.configure();

export default class Q12 extends React.Component {

    
    // onToken = (token) => {
    //     // console.log(token);
    //     saveStripeToken(token.id, token.email)
    //         .done((response) => {
    //             if (response.success) {
    //                 notification.success({
    //                     message: 'Payment Successful',
    //                     placement: 'bottomRight',
    //                 });
    //                 this.props.next();
    //             } else {
    //                 notification.error({
    //                     message: 'Payment Failed',
    //                     description: response.message,
    //                     placement: 'bottomRight',
    //                 });
    //             }
    //         })
    //         .fail((error) => {
    //             notification.error({
    //                 message: 'Payment Failed',
    //                 description: (error.responseJSON && error.responseJSON.message) ? error.responseJSON.message : "Something went wrong, Please try again later.",
    //                 placement: 'bottomRight',
    //             });
    //         });
    // };

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
        } else {
            toast("Something went wrong", { type: "error" });
        }

    };
    
//     async function handleToken(token, addresses) {
//         const response = await axios.post(
//             "https://ry7v05l6on.sse.codesandbox.io/checkout",
//             { token, product }
//         );
//         const { status } = response.data;
//         console.log("Response:", response.data);
//         if (status === "success") {
//             toast("Success! Check email for details", { type: "success" });
//         } else {
//             toast("Something went wrong", { type: "error" });
//         }
// }

    render() {
        return (
            <div style={{width: "100%", textAlign: "center"}}>
                <div style={{fontSize: "2em", marginBottom: "0.5em"}}>
                    Complete the payment
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    {/* <StripeCheckout
                        token={this.onToken}
                        stripeKey={constants.STRIPE_PUBLIC_KEY}
                        name="RestEasy"
                        description="Create a digital memorial"
                        image="/logo196.png" // the pop-in header image (default none)
                        panelLabel="Pay" // prepended to the amount in the bottom pay button
                        amount={100} // cents
                        currency="USD"
                    /> */}

                    <StripeCheckout
                        token={this.handleToken}
                        stripeKey={constants.STRIPE_PUBLIC_KEY}
                        amount={100} // cents
                        name="RestEasy Memorial Page"
                        description="Create a digital memorial"
                        image="/logo196.png" // the pop-in header image (default none)
                        billingAddress
                        shippingAddress
                    />
                </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Button type="primary" onClick={this.props.prev}>Previous</Button>
                    <Button type="primary" onClick={this.props.next}>Continue (REMOVE THIS IN FINAL PRODUCT)</Button>
                </div>
            </div>);
    }
}
