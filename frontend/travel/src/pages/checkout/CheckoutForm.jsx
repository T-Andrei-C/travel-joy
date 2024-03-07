import {PaymentElement} from "@stripe/react-stripe-js";
import {useState} from "react";
import {useStripe, useElements} from "@stripe/react-stripe-js";
import {addReservation, updateTravelPackageReservation} from "../../service/CRUDReservation";
import {useNavigate} from "react-router-dom";

export default function CheckoutForm({reservationData, travelType}) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const {error, paymentIntent} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/completion`,
            },
            redirect: "if_required",
        });

        if (!error && paymentIntent.status === "succeeded"){
            reservationData.bought = true;
            if (travelType === "travelPackage"){
                await updateTravelPackageReservation(reservationData);
            }else {
                await addReservation(reservationData);
            }
            navigate("/");
        } else if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured.");
        }

        setIsProcessing(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement className="m-5" id="payment-element"/>
            <button disabled={isProcessing || !stripe || !elements} id="submit">
            <span id="button-text">
              {isProcessing ? "Processing ... " : "Pay now"}
            </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}