import {FaLocationDot} from "react-icons/fa6";
import {BsFillHouseCheckFill, BsSlash} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import InfoPopup from "./InfoPopup";

const HotelCard = ({accommodation, city, checkIn, checkOut, numberOfPersons}) => {

    const navigate = useNavigate();

    const checkSearchData = () => {
        if (city && checkIn && checkOut && numberOfPersons) {
            navigate(`/accommodations/details/${accommodation.name}/${city}/${checkIn}/${checkOut}/${numberOfPersons}`);
        }
    }

    return (
        <div className="card col-12 col-md-12 col-lg-12 col-xl-9 border-success m-3 p-lg-0">
            <div className="row g-0 d-flex align-items-md-center justify-content-md-center">
                <div className="col-lg-5 col-md-6 text-center ">
                    <img src={accommodation.image_url?.image_url} className="img-fluid rounded"
                         alt={accommodation.name}/>
                </div>
                <div className="col-lg-7 col-md-6">
                    <div className="card-body">
                        <div className="col-12 d-flex justify-content-between p-0">
                            <h3 className="card-title text-success ps-1">{accommodation.name}</h3>
                        </div>
                        <div className="ps-1 col-12 d-flex" style={{marginBottom: "-0.5em"}}>
                            <h6 className="card-title text-success pe-1">{<FaLocationDot/>}</h6>
                            <h6 className="card-title text-success"
                                style={{paddingTop: "0.1em"}}>{accommodation.city.name}</h6>
                        </div>

                        <hr className="border-success"/>
                        <div className="row">
                            <div className="col-xl-8 col-12">
                                <div className="ps-1 col-12 d-flex">
                                    <p className="ps-1 pt-1 fw-bold">
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
                                <div className="ps-1 col-12 d-flex" style={{marginTop: "-0.5em"}}>
                                    <p className="ps-1 pt-1  "
                                       style={{fontSize: "15px"}}>{accommodation.description}</p>
                                </div>
                            </div>
                            <div className="my-auto col-xl-4 col-12 ">
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