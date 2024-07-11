import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Rating from "react-rating-stars-component";
import {addRating, isRated} from "../service/CRUDRating";

const RatingReservation = ({navigate, reservation, token, setDisabled}) => {
    const {reservationId} = useParams();

    useEffect(() => {
        if (reservationId !== undefined) {
            isRated(reservationId).then(e => {
                if (e) {
                    navigate("/myOrders");
                }
            })
        }
    }, [reservationId])

    const onChangeRating = async (e) => {
        await addRating(reservationId, e, token());
        await window.location.reload();
    }

    return (
        reservationId && reservationId === reservation.toString() &&
        <div onClick={() => navigate("/myOrders")}
             className="vh-100 vw-100 position-fixed top-0 bottom-0 start-0 end-0 bg-black bg-opacity-50 carousel-fade z-1">
            <div className="" style={{marginTop: "7em"}}>
                <dialog open className="col-xl-4 col-lg-6 col-md-6 col-sm-8 col-11 border-0 rounded-3">
                    <div className="d-flex justify-content-center">
                        <div className="d-flex justify-content-between col-12 ">
                            <div className="text-center col-12 px-3">
                                <p className="modal-title fs-4 fw-semibold">Rate your experience</p>
                            </div>
                            <div className="end-0 me-2 mt-1 position-absolute">
                                <button className="btn btn-close" onClick={() => navigate("/myOrders")}></button>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="d-flex justify-content-center">
                        <Rating
                            count={5}
                            size={40}
                            value={0}
                            onChange={onChangeRating}
                            edit={true}
                            isHalf={true}
                            id="Rating"
                        />
                    </div>
                </dialog>
            </div>
        </div>
    )
}

export default RatingReservation;