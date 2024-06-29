import {useEffect, useState} from "react";

import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import {chargePayment, getPublicKey} from "../../service/CRUDPayment";
import UserInfoForm from "./UserInfoForm";
import ReviewOrder from "./ReviewOrder";
import {getAuthUser} from "../../service/CRUDUsers";
import {useNavigate, useParams} from "react-router-dom";
import {useAuthHeader, useIsAuthenticated} from "react-auth-kit";
import {getRoomBySearch, getRoomDiscountByCheckInAndCheckOut} from "../../service/CRUDRooms";
import Alert from "../../components/Alert";

const Checkout = () => {

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [alert, setAlert] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [availableDiscount, setAvailableDiscount] = useState(0);
    const {city, housingName, room, checkIn, checkOut, price} = useParams();

    const [personalInfo, setPersonalInfo] = useState({
        email: "",
        phoneNumber: "",
        name: "",
        check_in: checkIn,
        check_out: checkOut,
        bought: false,

        country: "",
        county: "",
        city: "",
        amount: 0,

        userId: 0,
        roomId: room
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

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if ((checkOutDate.getTime() - checkInDate.getTime()) < 0) {
            navigate("/error");
        }

        getRoomBySearch(room, housingName, city, checkIn, checkOut).then(room => {
            if (room.message !== "room not found") {
                setCurrentRoom(room);
            } else {
                navigate("/error");
            }
        })

        getRoomDiscountByCheckInAndCheckOut(room, checkIn, checkOut).then(discount => {
            setAvailableDiscount(discount);
        })

        getAuthUser(token()).then((user) => {
            setAuthUser(user);
        })
    }, []);

    useEffect(() => {
        if (personalInfo.name.trim().length !== 0 && personalInfo.name.trim().includes(" ") && personalInfo.email !== "" && personalInfo.phoneNumber !== ""
            && personalInfo.city !== "" && personalInfo.country !== "" && personalInfo.county !== "") {
            chargePayment(personalInfo.amount).then((clientSecret) => {
                setClientSecret(clientSecret.key);
            })
        } else {
            setClientSecret("");
        }
    }, [personalInfo]);

    return (
        <div className="col-12 text-center">
            <div className="col-12 row d-flex justify-content-center m-0 p-0">
                <div className="col-xl-5 col-lg-5 col-md-6 col-sm-10 col-11 mt-sm-3 mt-md-0 mt-lg-0 mt-xl-0 mt-3">
                    <UserInfoForm data={personalInfo} dataCallback={setPersonalInfo} user={authUser}
                                  room={currentRoom} discount={availableDiscount}/>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-10 col-12">
                    <ReviewOrder checkIn={checkIn} checkOut={checkOut} city={city} housingName={housingName}
                                 room={currentRoom} discount={availableDiscount}/>
                </div>
            </div>
            <div
                className="col-xl-5 col-lg-5 col-md-8 col-sm-10 col-12 align-items-center text-center d-inline-block mt-sm-4 mt-md-0 mt-lg-0 mt-xl-0 mt-4">
                <h3 className="mb-4">Payment details</h3>
                {clientSecret && stripePromise && (
                    <Elements stripe={stripePromise} options={{clientSecret}}>
                        <PaymentForm reservationData={personalInfo} roomId={room}
                                     checkIn={checkIn} checkOut={checkOut} housingName={housingName} city={city}
                                     currentRoom={currentRoom} setAlert={setAlert}/>
                    </Elements>
                )}
            </div>
            <div className="ms-3 z-3">
                <Alert alertData={alert} alertCallBack={setAlert}/>
            </div>
        </div>
    );
}

export default Checkout;