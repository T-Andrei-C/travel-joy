import {PaymentElement} from "@stripe/react-stripe-js";
import {useState} from "react";
import {useStripe, useElements} from "@stripe/react-stripe-js";
import {addReservation, checkRoomReservation} from "../../service/CRUDReservation";
import {useNavigate} from "react-router-dom";
import {getRoomBySearch} from "../../service/CRUDRooms";
import Alert from "../../components/Alert";

export default function PaymentForm({reservationData, roomId, checkIn, checkOut, housingName, city, currentRoom}) {
    const stripe = useStripe();
    const elements = useElements();

    const [isProcessing, setIsProcessing] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertColor, setAlertColor] = useState("");
    const [alertContent, setAlertContent] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        elements.submit().then(error => {
            if (error.error === undefined) {
                setIsProcessing(true);
                getRoomBySearch(roomId, housingName, city, checkIn, checkOut).then(async room => {
                    if (room.message !== "room not found") {
                        if (currentRoom.price === room.price && currentRoom.type.name === room.type.name){
                            const {error, paymentIntent} = await stripe.confirmPayment({
                                elements,
                                confirmParams: {
                                    return_url: `${window.location.origin}/completion`,
                                },
                                redirect: "if_required",
                            });

                            if (!error && paymentIntent.status === "succeeded") {
                                reservationData.bought = true;
                                await addReservation(reservationData);
                                navigate("/");
                            } else {
                                setAlertContent("Payment failed, please try again later!");
                                setAlertColor("danger");
                                setShowAlert(true);
                            }
                        } else {
                            setAlertContent("Room price or type has been changed, you will be send to the main page shortly!!");
                            setAlertColor("danger");
                            setShowAlert(true);

                            setTimeout(() => {
                                navigate("/");
                            }, 5000)
                        }
                    } else {
                        setAlertContent("Room has been bought or has been updated! We will redirect you to the home page shortly!");
                        setAlertColor("danger");
                        setShowAlert(true);

                        setTimeout(() => {
                            navigate("/");
                        }, 5000)
                    }
                })
            }
        });

        setIsProcessing(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement className="m-5" id="payment-element"/>
            <button disabled={isProcessing || !stripe || !elements} id="submit"
                    className="btn btn-outline-light bg-success">
            <span id="button-text">
              {isProcessing ? "Processing ... " : "Pay now"}
            </span>
            </button>
            {
                showAlert && <Alert color={alertColor} content={alertContent} callBack={setShowAlert}/>
            }
        </form>
    );
}