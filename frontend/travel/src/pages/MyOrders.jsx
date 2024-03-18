import {useEffect, useState} from "react";
import {useAuthHeader, useIsAuthenticated} from "react-auth-kit";
import {getAuthUser} from "../service/CRUDUsers";
import {useNavigate} from "react-router-dom";
import {getReservationsByUserId} from "../service/CRUDReservation";

const MyOrders = () => {
    const token = useAuthHeader();
    const [myOrders, setMyOrders] = useState();
    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();

    useEffect(() => {
        if (!isAuth()) {
            navigate("/login");
        }
        getReservationsByUserId(token()).then((orders) => {
            setMyOrders(orders);
        })
    }, []);
    console.log(myOrders);
}


export default MyOrders;