import {useEffect, useState} from "react";
import {useAuthHeader, useIsAuthenticated} from "react-auth-kit";
import {useNavigate} from "react-router-dom";
import {getReservationsByUserId} from "../service/CRUDReservation";
import MyOrderCard from "../components/MyOrderCard";

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
    return (
            <div className="row m-0 p-0">
                {myOrders?.map(order => (
                    <MyOrderCard checkIn={order?.check_in} checkOut={order?.check_out}
                                 accommodationName={order?.room?.accommodation?.name}
                                 accommodationCity={order?.room?.accommodation?.city.name}
                                 image={order?.room?.accommodation?.image_url.image_url} price={order?.amount}
                                 typeRoom={order?.room?.type} token={token} accommodationId={order?.room?.accommodation?.id}
                                 reservationId={order?.id}/>
                ))}
            </div>
    )
}


export default MyOrders;