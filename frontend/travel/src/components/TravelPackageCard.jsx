import {GiForkKnifeSpoon} from "react-icons/gi";
import {FaBed} from "react-icons/fa";
import {BiSolidCalendar} from "react-icons/bi";
import {HiArrowNarrowRight} from "react-icons/hi";
import {FaLocationDot} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import HotelRating from "./HotelRating";
import {useEffect, useState} from "react";
import {numberOfAccommodationRatings} from "../service/CRUDRating";
import {calculateDiscountPrice, totalDays} from "../service/PaymentService";
import {getAccommodationImage} from "../service/CRUDAccommodations";
import {verifyRoomOfferAvailability} from "../service/CRUDTravelPackages";
import Alert from "./Alert";

const TravelPackageCard = ({travelPackage, setAlert}) => {
    const [ratingsSize, setRatingsSize] = useState(0);
    const navigate = useNavigate();
    const originalPrice = totalDays(travelPackage.date_from, travelPackage.date_to) * travelPackage.room?.price;
    const discountPrice = calculateDiscountPrice(travelPackage.date_from, travelPackage.date_to, travelPackage.discount.value, travelPackage.room?.price);

    const verifyRoomOffer = () => {
        verifyRoomOfferAvailability(travelPackage.id).then(response => {
            if (response.object) {
                setAlert(current => [...current, response]);
            } else {
                navigate(`/checkout/${travelPackage.room.accommodation.city.name}/${travelPackage.room.accommodation.name}/${travelPackage.room.id}/${travelPackage.date_from}/${travelPackage.date_to}/${discountPrice}`);
            }
        })
    }

    useEffect(() => {
        numberOfAccommodationRatings(travelPackage.room?.accommodation.id).then(ratingsSize => {
            setRatingsSize(ratingsSize);
        })
    }, []);

    return (
        <div className="card col-12 col-md-12 col-lg-12 col-xl-9 border-success m-3 p-lg-0">
            <div className="row g-0 d-flex align-items-md-center justify-content-md-center">
                <div className="col-lg-5 col-md-6 text-center">
                    <img src={getAccommodationImage(travelPackage.room?.accommodation.id)} className="card-img"
                         onError={(e) => e.target.src = "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png"}
                         alt={travelPackage.room?.accommodation.name}/>
                </div>
                <div className="col-lg-7 col-md-6 card-body">
                    <div className="col-12 d-flex justify-content-between p-0">
                        <h3 className="card-title col-5 text-success">{travelPackage.room?.accommodation.name}</h3>
                        <div className="col-7 d-flex justify-content-end">
                            <HotelRating value={travelPackage.room?.accommodation.rating}
                                         numberOfRatings={ratingsSize}/>
                        </div>
                    </div>
                    <div className="ps-1 col-12 d-flex justify-content-between" style={{marginBottom: "-0.5em"}}>
                        <div className="d-flex justify-content-center">
                            <h6 className="card-title text-success pe-1">{<FaLocationDot/>}</h6>
                            <h6 className="card-title text-success"
                                style={{paddingTop: "0.1em"}}>{travelPackage.room?.accommodation.city.name}</h6>
                        </div>
                        <div>
                            <p className="card-title m-0 text-black-50 text-decoration-line-through fw-light d-flex justify-content-end"
                               style={{fontSize: "0.8em"}}>{originalPrice} RON</p>
                            <h5 className="card-title text-black fw-light d-flex justify-content-end">{discountPrice} RON</h5>
                        </div>
                    </div>
                    <hr className="border-success"/>
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-xl-8 col-md-7 col-12 px-auto">
                            <div className="ps-1 col-12 d-flex" style={{marginTop: "-0.5em"}}>
                                <p><BiSolidCalendar/></p>
                                <div className="p-0 col-12 d-flex">
                                    <p className="ps-1 pt-1"
                                       style={{fontSize: "13px"}}>{travelPackage.date_from}</p>
                                    <p className="ps-1" style={{fontSize: "13px", paddingTop: "0.2em"}}>{
                                        <HiArrowNarrowRight/>}</p>
                                    <p className="ps-1 pt-1" style={{fontSize: "13px"}}>{travelPackage.date_to}</p>
                                </div>
                                <p className="ps-1 pt-1" style={{fontSize: "13px"}}></p>
                            </div>
                            <div className="ps-1 col-12 d-flex" style={{marginTop: "-0.5em"}}>
                                <p><GiForkKnifeSpoon/></p>
                                <p className="ps-1 pt-1"
                                   style={{fontSize: "13px"}}> {travelPackage?.type.name}</p>
                            </div>
                            <div className="ps-1 col-12 d-flex" style={{marginTop: "-0.5em"}}>
                                <p><FaBed/></p>
                                <p className="ps-1 pt-1"
                                   style={{fontSize: "13px"}}> {travelPackage.room.type.name}</p>
                            </div>
                        </div>
                        <div className="my-auto col-xl-4 col-md-5 col-12 mt-lg-5 mt-md-5 mt-0">
                            <a onClick={verifyRoomOffer}
                               className="btn btn-success float-md-end mb-3 col-12">
                                Buy Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TravelPackageCard;