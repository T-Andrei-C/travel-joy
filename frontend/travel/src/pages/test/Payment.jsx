import {useEffect, useState} from "react";

import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import {chargePayment, getPublicKey} from "../../service/CRUDPayment";

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
            email : "",
            phoneNumber : "",
            name: "",

            country: "",
           county: "",
            city: "",
            address: "",
             amount: 1000 * 100,

            reservation: {
                id: 9
            },

            user: {
                id: 10
            }
        }

        chargePayment(paymentModel).then((clientSecret) => {
            setClientSecret(clientSecret.key);
        })
    }, []);

    return (
        <div className="text-center">
            <h3 className="mb-4">Payment details</h3>
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{clientSecret}}>
                    <CheckoutForm/>
                </Elements>
            )}
        </div>
    );
}

export default Payment;