import {HiArrowNarrowRight} from "react-icons/hi";
import Rating from "react-rating-stars-component";
import {useEffect, useState} from "react";
import {addRating, getRatingByUserId, isRated} from "../service/CRUDRating";
import {FaLocationDot} from "react-icons/fa6";

const MyOrderCard = ({
                         checkIn,
                         checkOut,
                         image,
                         accommodationName,
                         accommodationCity,
                         price,
                         typeRoom,
                         token,
                         reservationId
                     }) => {

    const [rating, setRating] = useState(null);
    const [isRatingEdit, setIsRatingEdit] = useState(null);

    useEffect(() => {
        getRatingByUserId(token(), reservationId).then(r => {
            setRating(r);
        })
        isRated(token(),reservationId).then(e => {
            setIsRatingEdit(e);
        })

    }, []);

    const onChangeRating = async (e) => {
        console.log(e);
        await addRating(reservationId, e, token());
    }

    return (
        <div className="card col-3">
            <div className="row">
                <div className="col-6 ">
                    <h5 className="card-text mt-1 ms-2">{accommodationName}</h5>
                    <p className="card-text text-success  ms-2 mb-2">{<FaLocationDot/>} {accommodationCity}</p>
                </div>
                <div className="col-6">
                    <div className="d-flex justify-content-end me-1">
                        {rating &&
                            <Rating
                                count={5}
                                size={23}
                                value={rating.ratingValue}
                                onChange={onChangeRating}
                                edit={isRatingEdit}
                                isHalf={true}
                                id="Rating"
                            />}
                    </div>

                    <p className="text-end mt-1 me-1">{price} RON</p>
                </div>
            </div>
            <img src={image} className="card-img-top" alt=""/>
            <div className="card-body">
                <div className="d-flex justify-content-start">
                    <h6>{checkIn}</h6>
                    <h6 className="ps-1 pe-1"><HiArrowNarrowRight/></h6>
                    <h6>{checkOut}</h6>
                </div>
                <h6>{typeRoom}</h6>
            </div>

        </div>
    );
}

export default MyOrderCard;