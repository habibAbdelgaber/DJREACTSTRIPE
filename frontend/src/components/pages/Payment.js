import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { api } from "../../api/api";
import { CheckoutForm } from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51HTTDxALzdygozDHEtybzeMKQQsjL1zYVYUYHJr3SgG9CRT3gchP1ds7JfhR4qA7gpKmBC3PDY2ReIIK499HJAUT005Gpv5g8L");

export function Payments() {
    const { user: { token } } = useContext(AuthContext)
    const [clientSecret, setClientSecret] = useState("");
    console.log(clientSecret)

    const { id } = useParams()

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        axios.post(api.payment.createPayment, {
            job_id: id
        },
            {
                headers: {
                    "Authorization": `Token ${token}`
                }
            })
            .then((res) => {
                setClientSecret(res.data.clientSecret)
            })
    }, [token, id]);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div>
            {clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}