import {FaLocationDot} from "react-icons/fa6";
import {BsFillHouseCheckFill, BsSlash} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import InfoPopup from "./InfoPopup";
import Rating from "react-rating-stars-component";
import HotelRating from "./HotelRating";
import {numberOfAccommodationRatings} from "../service/CRUDRating";
import {useEffect, useState} from "react";
import {
    getAccommodationById,
    getAccommodationImage,
    verifyAccommodationAvailability
} from "../service/CRUDAccommodations";
import Alert from "./Alert";

const HotelCard = ({accommodation, city, checkIn, checkOut, numberOfPersons, setAlert}) => {

    const navigate = useNavigate();
    const [ratingsSize, setRatingsSize] = useState(0);

    const checkSearchData = () => {
        verifyAccommodationAvailability(accommodation.id, checkIn, checkOut).then(response => {
            if (response.object) {
                setAlert(current => [...current, response]);
            } else {
                if (city && checkIn && checkOut && numberOfPersons) {
                    navigate(`/accommodations/details/${accommodation.name}/${city}/${checkIn}/${checkOut}/${numberOfPersons}`);
                }
            }
        })
    }

    useEffect(() => {
        numberOfAccommodationRatings(accommodation.id).then(ratingsSize => {
            setRatingsSize(ratingsSize);
        })
    }, []);

    return (
        <div className="card col-12 col-md-12 col-lg-12 col-xl-9 border-success m-3 p-lg-0">
            <div className="row g-0 d-flex align-items-md-center justify-content-md-center">
                <div className="col-lg-5 col-md-6 text-center">
                    <img src={getAccommodationImage(accommodation?.id)} className="img-fluid rounded"
                         onError={(e) => e.target.src = "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png"}
                         alt={accommodation.name}/>
                </div>
                <div className="col-lg-7 col-md-6">
                    <div className="card-body row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="col-12 d-flex justify-content-between p-0">
                                <h3 className="card-title text-success ps-1">{accommodation.name}</h3>
                            </div>
                            <div className="ps-1 col-12 d-flex">
                                <h6 className="card-title text-success pe-1">{<FaLocationDot/>}</h6>
                                <h6 className="card-title text-success"
                                    style={{paddingTop: "0.1em"}}>{accommodation.city.name}</h6>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 d-flex justify-content-end">
                            <HotelRating value={accommodation.rating} numberOfRatings={ratingsSize}/>
                        </div>
                        <div className="d-flex justify-content-center">
                            <hr className="border-success col-12"/>
                        </div>
                        <div className="row m-auto p-0">
                            <div className="col-xl-8 col-12">
                                <div className="col-12 d-flex">
                                    <p className="fw-bold">
                                        <BsFillHouseCheckFill/>
                                        {accommodation.accommodation_facilities?.map(f => (
                                            f.name === accommodation.accommodation_facilities[accommodation.accommodation_facilities.length - 1].name ?
                                                <span style={{fontSize: "13px"}}> {f.name.toUpperCase()} </span> :
                                                <span
                                                    style={{fontSize: "13px"}}> {f.name.toUpperCase()}<BsSlash/></span>
                                        ))
                                        }
                                    </p>
                                </div>
                                <div className="col-12 d-flex" style={{marginTop: "-0.5em"}}>
                                    <p className="pt-1"
                                       style={{fontSize: "15px"}}>{accommodation.description}</p>
                                </div>
                            </div>
                            <div className="col-xl-4 col-12">
                                <a onClick={checkSearchData} className="btn btn-success float-md-end mb-3 col-12"
                                   data-bs-toggle={city && checkIn && checkOut && numberOfPersons ? "" : "modal"}
                                   data-bs-target="#viewDetailsModal">
                                    View Details
                                </a>
                                <InfoPopup id="viewDetailsModal"
                                           header="Oops! Fill in travel details for adventure!"
                                           content="We share your excitement to discover our offers! Just one more step: complete the search fields before unlocking the next stage."/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelCard;