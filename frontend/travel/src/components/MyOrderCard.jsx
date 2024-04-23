import {HiArrowNarrowRight} from "react-icons/hi";
import Rating from "react-rating-stars-component";
import {useEffect, useState} from "react";
import {addRating, canRate, getRatingByUserId, isRated, isRatingPresent} from "../service/CRUDRating";
import {FaLocationDot} from "react-icons/fa6";
import {FaBed, FaPowerOff} from "react-icons/fa";
import {BiSolidCalendar} from "react-icons/bi";
import RatingReservation from "./RatingReservation";

const MyOrderCard = ({
                         checkIn,
                         checkOut,
                         image,
                         accommodationName,
                         accommodationCity,
                         price,
                         typeRoom,
                         token,
                         reservationId,
                         navigate
                     }) => {

    const [rating, setRating] = useState(null);
    const [ratingPresent, setRatingPresent] = useState(null);
    const [test, setTest] = useState(true);

    useEffect(() => {
        getRatingByUserId(token(), reservationId).then(r => {
            setRating(r);
        })
        isRatingPresent(reservationId).then(r => {
            setRatingPresent(r);
        })
        canRate(reservationId).then(r => {
            setTest(r);
        })
    }, []);

    return (
        <>
            <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 m-0 p-3">
                <div className="card col-12 m-0">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-6">
                            <h5 className="card-text mt-2 ms-2">{accommodationName}</h5>
                            <p className="card-text text-success  ms-2 mb-2">{<FaLocationDot/>} {accommodationCity}</p>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-6">
                            <div className="d-flex justify-content-end me-1">
                                {ratingPresent && rating ?
                                    <Rating
                                        count={5}
                                        size={22}
                                        value={rating.ratingValue}
                                        edit={false}
                                        isHalf={true}
                                        id="Rating"
                                    /> :
                                    <button disabled={!test}
                                            className="btn text-success bg-transparent border-0 text-decoration-underline"
                                            onClick={() => navigate(`rating/${reservationId}`)}>Give Rating</button>
                                }
                            </div>
                            <p className="text-end mt-1 me-1">{price} RON</p>
                        </div>
                    </div>
                    <img src={image} className="card-img" alt=""/>
                    <div className="card-body">
                        <div className="d-flex justify-content-start">
                            <h6><BiSolidCalendar className="mb-1 text-success"/> {checkIn}</h6>
                            <h6 className="ps-1 pe-1"><HiArrowNarrowRight/></h6>
                            <h6>{checkOut}</h6>
                        </div>
                        <h6><FaBed className="text-success"/> {typeRoom}</h6>
                    </div>
                </div>
            </div>
            <RatingReservation navigate={navigate} reservation={reservationId} token={token}/>
        </>
    );
}

export default MyOrderCard;