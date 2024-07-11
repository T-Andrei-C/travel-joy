import {HiArrowNarrowRight} from "react-icons/hi";
import Rating from "react-rating-stars-component";
import {useEffect, useState} from "react";
import {canRate, getRatingByUserId, isRatingPresent} from "../service/CRUDRating";
import {FaLocationDot} from "react-icons/fa6";
import {FaBed, FaPowerOff} from "react-icons/fa";
import {BiSolidCalendar} from "react-icons/bi";
import RatingReservation from "./RatingReservation";
import {getAccommodationImage} from "../service/CRUDAccommodations";
import {useParams} from "react-router-dom";

const MyOrderCard = ({
                         checkIn,
                         checkOut,
                         accommodationId,
                         accommodationName,
                         accommodationCity,
                         price,
                         typeRoom,
                         token,
                         id,
                         navigate
                     }) => {

    const [rating, setRating] = useState(null);
    const [ratingPresent, setRatingPresent] = useState(null);
    const [rated, setRated] = useState(true);
    const {reservationId} = useParams();

    useEffect(() => {
        getRatingByUserId(id).then(r => {
            setRating(r);
        })
        isRatingPresent(id).then(r => {
            setRatingPresent(r);
        })
        canRate(id).then(r => {
            setRated(r);
        })
    }, []);
    
    return (
        <>
            <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 m-0 p-2">
                <div className="position-relative">
                    <div className="bg-black rounded">
                        <img src={getAccommodationImage(accommodationId)} className="col-12 opacity-50 rounded" alt=""/>
                    </div>
                    <div className="position-absolute top-0 text-white col-12">
                        <div className="d-flex justify-content-between mx-1">
                            <h5 className="mt-2">{accommodationName}</h5>
                            {ratingPresent && rating ?
                                <Rating
                                    count={5}
                                    size={22}
                                    value={rating.ratingValue}
                                    edit={false}
                                    isHalf={true}
                                    id="Rating"
                                /> :
                                <button disabled={!rated}
                                        className="btn btn-dark text-warning p-0 bg-transparent border-0 text-decoration-underline"
                                        onClick={() => navigate(`/myOrders/rating/${id}`)}>Give Rating</button>
                            }
                        </div>
                        <div className="d-flex justify-content-between mx-1">
                            <p className="m-0">{<FaLocationDot/>} {accommodationCity}</p>
                            <p className="">{price} RON</p>
                        </div>
                    </div>
                    <div className="position-absolute bottom-0 text-white col-12">
                        <div className="d-flex justify-content-between mx-1">
                            <div className="d-flex justify-content-start">
                                <h6 className="m-0"><BiSolidCalendar className="mb-1 text-warning"/> {checkIn}</h6>
                                <h6 className="ps-1 pe-1"><HiArrowNarrowRight style={{marginBottom: "0.13em"}}/></h6>
                                <h6>{checkOut}</h6>
                            </div>
                            <h6><FaBed className="text-warning"/> {typeRoom.name}</h6>
                        </div>
                    </div>
                </div>
            </div>
            {
                reservationId === id.toString() ? <RatingReservation navigate={navigate} reservation={id} token={token}/> : ""
            }
        </>
    );
}

export default MyOrderCard;