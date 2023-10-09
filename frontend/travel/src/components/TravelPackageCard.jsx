import testImage from "./img/homeImage.jpg";
import {GiForkKnifeSpoon} from "react-icons/gi";
import {FaBed} from "react-icons/fa";
import {BiSolidCalendar} from "react-icons/bi";
import {BsArrowRightShort} from "react-icons/bs";
import {HiArrowNarrowRight} from "react-icons/hi";
import {FaLocationDot, FaMapLocationDot} from "react-icons/fa6";

const TravelPackageCard = ({travelPackage}) => {
    return (
        <div className="card col-12 col-md-10 col-lg-8 border-success m-3" style={{maxWidth: "80%"}}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={travelPackage.room.accommodation.image_url?.image_url} className="card-img" alt={travelPackage.room.accommodation.name} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="col-12 d-flex justify-content-between p-0">
                            <h3 className="card-title text-success">{travelPackage.room.accommodation.name}</h3>
                            <h5 className="card-title text-black fw-light">{travelPackage.price} RON</h5>
                        </div>
                        <div className="ps-1 col-12 d-flex" style={{marginBottom: "-0.5em"}}>
                            <h6 className="card-title text-success pe-1">{<FaLocationDot/>}</h6>
                            <h6 className="card-title text-success" style={{paddingTop: "0.1em"}}>{travelPackage.room.accommodation.city.name}</h6>
                        </div>

                        <hr className="border-success" />
                        <div className="row">
                        <div className="col-xl-9 col-12 px-auto">
                            <div className="ps-1 col-12 d-flex" style={{marginTop: "-0.5em"}}>
                                <p><BiSolidCalendar/></p>
                                <div className="p-0 col-12 d-flex">
                                    <p className="ps-1 pt-1" style={{fontSize: "13px"}}>{travelPackage.checkIn}</p>
                                    <p className="ps-1" style={{fontSize: "13px", paddingTop: "0.2em"}}>{<HiArrowNarrowRight/>}</p>
                                    <p className="ps-1 pt-1" style={{fontSize: "13px"}}>{travelPackage.checkOut}</p>
                                </div>
                                <p className="ps-1 pt-1" style={{fontSize: "13px"}}>  </p>
                            </div>
                            <div className="ps-1 col-12 d-flex" style={{marginTop: "-0.5em"}}>
                                <p><GiForkKnifeSpoon/></p>
                                <p className="ps-1 pt-1" style={{fontSize: "13px"}}> {travelPackage.travelPackageType}</p>
                            </div>
                            <div className="ps-1 col-12 d-flex" style={{marginTop: "-0.5em"}}>
                                <p><FaBed/></p>
                                <p className="ps-1 pt-1" style={{fontSize: "13px"}}> {travelPackage.room.type}</p>
                            </div>
                        </div>
                        <div className="my-auto col-xl-3 col-12">
                            <a href="#" className="btn btn-success float-md-end mb-3 col-12">
                                Buy Now
                            </a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TravelPackageCard;