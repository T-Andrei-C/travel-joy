import {useEffect, useState} from "react";

import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import {chargePayment, getPublicKey} from "../../service/CRUDPayment";
import AddressFormTest from "./AddressFormTest";
import ReviewOrder from "./ReviewOrder";

const Payment = () => {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [personalInfo, setPersonalInfo] = useState({});

    useEffect(() => {
        getPublicKey().then((publishableKey) => {
            setStripePromise(loadStripe(publishableKey.key));
        })
    }, []);

    useEffect(() => {
        const paymentModel = {
            email: "",
            phoneNumber: "",
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
        <div className="col-12 text-center">
            <div className="col-12 row d-flex justify-content-center">
                <div className="col-5 ">
                    <AddressFormTest data={personalInfo}/>
                </div>
                <div className="col-5">
                    <ReviewOrder personalInfo={personalInfo}/>
                </div>
            </div>

            <div className="col-5 align-items-center text-center m-0 d-inline-block">
                    <h3 className="mb-4">Payment details</h3>
                    {clientSecret && stripePromise && (
                        <Elements stripe={stripePromise} options={{clientSecret}}>
                            <CheckoutForm/>
                        </Elements>
                    )}
            </div>
        </div>
    );
}

export default Payment;