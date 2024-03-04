import {useEffect, useState} from "react";

import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import {chargePayment, getPublicKey} from "../../service/CRUDPayment";
import AddressFormTest from "./AddressFormTest";
import ReviewOrder from "./ReviewOrder";
import {getAuthUser} from "../../service/CRUDUsers";
import {useNavigate} from "react-router-dom";
import {useAuthHeader, useIsAuthenticated} from "react-auth-kit";

const Payment = () => {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [personalInfo, setPersonalInfo] = useState({
        email: "3",
        phoneNumber: "3",
        name: "e",

        country: "s",
        county: "d",
        city: "f",
        amount: 2 * 100,

        user: {}
    });
    const [authUser, setAuthUser] = useState({});
    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();
    const token = useAuthHeader();

    useEffect(() => {
        getPublicKey().then((publishableKey) => {
            setStripePromise(loadStripe(publishableKey.key));
        })
    }, []);

    useEffect(() => {
        if (!isAuth()) {
            navigate("/login");
        }
        getAuthUser(token()).then((user) => {
            setAuthUser(user);
        })
    }, []);

    useEffect(() => {
        // if (personalInfo.name !== "" && personalInfo.email !== "" && personalInfo.phoneNumber !== ""
        //     && personalInfo.city !== "" && personalInfo.country !== "" && personalInfo.county !== ""){
        //     console.log("stripe")
            chargePayment(personalInfo).then((clientSecret) => {
                setClientSecret(clientSecret.key);
            })
        // }
        // console.log("works")
        // console.log(personalInfo)
    }, [personalInfo]);

    return (
        <div className="col-12 text-center">
            <div className="col-12 row d-flex justify-content-center">
                <div className="col-5">
                    <AddressFormTest data={personalInfo} dataCallback={setPersonalInfo} user={authUser}/>
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