import {useEffect, useState} from "react";

import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import {API_URL} from "../service/API";
import {chargePayment, getPublicKey} from "../service/CRUDPayment";

const Payment = () => {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        getPublicKey().then((publishableKey) => {
            setStripePromise(loadStripe(publishableKey.key));
        })
    }, []);

    useEffect(() => {
        const paymentModel = {
            email: "toroaba_andrei@gmail.com",
            amount: 1000 * 100
        }

        chargePayment(paymentModel).then((clientSecret) => {
            setClientSecret(clientSecret.key);
        })
    }, []);

    return (
        <>
            <h1>React Stripe and the Payment Element</h1>
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{clientSecret}}>
                    <CheckoutForm/>
                </Elements>
            )}
        </>
    );
}

export default Payment;