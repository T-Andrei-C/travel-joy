import testImage from "./img/homeImage.jpg";
import {FaLocationDot} from "react-icons/fa6";
import {BiSolidCalendar} from "react-icons/bi";
import {HiArrowNarrowRight} from "react-icons/hi";
import {GiForkKnifeSpoon} from "react-icons/gi";
import {FaBed, FaPencilAlt} from "react-icons/fa";
import {BsFillHouseCheckFill, BsSlash} from "react-icons/bs";
import accommodations from "../pages/Accommodations";

const HotelCard = ({accommodation}) => {
    return (
        <div className="card col-12 col-md-10 col-lg-8 border-success m-3" style={{maxWidth: "80%"}}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={testImage} className="card-img" alt={accommodation.name} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="col-12 d-flex justify-content-between p-0">
                            <h3 className="card-title text-success">{accommodation.name}</h3>
                        </div>
                        <div className="ps-1 col-12 d-flex" style={{marginBottom: "-0.5em"}}>
                            <h6 className="card-title text-success pe-1">{<FaLocationDot/>}</h6>
                            <h6 className="card-title text-success" style={{paddingTop: "0.1em"}}>{accommodation.city.name}</h6>
                        </div>

                        <hr className="border-success" />
                        <div className="d-flex justify-content-between">
                            <div>
                                <div className="ps-1 col-12 d-flex" style={{marginTop: "-0.5em"}}>
                                    <p><BsFillHouseCheckFill/></p>
                                    {accommodation.accommodation_facilities?.map(f =>(
                                        f.name === accommodation.accommodation_facilities[accommodation.accommodation_facilities.length - 1].name ?
                                        <p className="ps-1 pt-1 fw-bold" style={{fontSize: "13px"}}> {f.name.toUpperCase()} </p> :
                                        <p className="ps-1 pt-1 fw-bold" style={{fontSize: "13px"}}> {f.name.toUpperCase()} <BsSlash/></p>
                                        ))
                                    }
                                </div>
                                <div className="ps-1 col-12 d-flex" style={{marginTop: "-0.5em"}}>
                                    {/*<p><FaPencilAlt/></p>*/}
                                    <p className="ps-1 pt-1  " style={{fontSize: "15px"}}>{accommodation.description}</p>
                                </div>
                            </div>
                            <div style={{marginTop: "1.3em"}}>
                                <a href="#" className="btn btn-success float-md-end mb-3">
                                    View Details
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelCard;