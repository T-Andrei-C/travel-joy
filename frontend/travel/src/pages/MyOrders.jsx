import {useEffect, useState} from "react";
import {useAuthHeader, useIsAuthenticated} from "react-auth-kit";
import {Outlet, useNavigate} from "react-router-dom";
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
        <div >
            <div className="d-flex justify-content-center">
                <div className="row mb-3 mt-3 col-sm-8 col-md-6 col-xl-3 col-lg-3 col-10 ">
                    <div className="col-10 m-0 p-0">
                        <input type="text" className="form-control border-success rounded-end-0" placeholder="Search by..." aria-label="Text input with dropdown button"/>
                    </div>
                    <button className="btn btn-success dropdown-toggle border-success col-2 m-0 p-0 rounded-start-0" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                    <ul className="dropdown-menu dropdown-menu-end border-success col-xl-2 col-lg-2 col-md-3 col-sm-6 col-8">
                        <li><a className="dropdown-item" href="#">City</a></li>
                        <li><a className="dropdown-item" href="#">Accommodation Name</a></li>
                    </ul>
                </div>
            </div>

            <div className="row m-0 p-0">
                {myOrders?.map(order => (
                    <MyOrderCard checkIn={order?.check_in} checkOut={order?.check_out}
                                 accommodationName={order?.room?.accommodation?.name}
                                 accommodationCity={order?.room?.accommodation?.city.name}
                                 image={order?.room?.accommodation?.image_url.image_url} price={order?.amount}
                                 typeRoom={order?.room?.type} token={token} accommodationId={order?.room?.accommodation?.id}
                                 reservationId={order?.id} navigate={navigate}/>
                ))}
            </div>
        </div>

    )
}


export default MyOrders;