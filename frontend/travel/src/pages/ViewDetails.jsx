import {useNavigate, useParams} from "react-router-dom";
import homeImage from "../components/img/homeImage.jpg"
import {BiSolidCalendar} from "react-icons/bi";
import {FaBed} from "react-icons/fa";
import {BsFillHouseCheckFill} from "react-icons/bs";
import {FaLocationDot} from "react-icons/fa6";
import {useEffect, useState} from "react";
import {getAllAvailableRooms} from "../service/CRUDRooms";

const ViewDetails = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const {destination, name, checkIn, checkOut, numberOfPersons} = useParams();
    useEffect(() => {
        getAllAvailableRooms(name,destination,numberOfPersons,checkIn,checkOut).then(room => setRooms(room));
    }, []);

    console.log(rooms);
    return (
        <div className="d-flex justify-content-center align-items-center row p-0 m-0">
            <div className="col-xl-9 col-12 row mt-3 d-flex justify-content-md-center justify-content-sm-center align-items-md-center align-items-sm-center p-0 m-0">
                <div className="col-xl-12 col-lg-12 col-md-8 col-sm-11 col-12">
                    <h2>{name}</h2>
                    <h6 className="text-success"><FaLocationDot/> {destination}</h6>
                </div>
                <div id="carouselExampleIndicators" className="col-xl-7 col-lg-7 col-md-8 col-sm-11 col-12 carousel slide carousel-fade ">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={homeImage} className="d-block w-100" alt="..."/>
                        </div>
                        <div className="carousel-item">
                            <img src={homeImage} className="d-block w-100" alt="..."/>
                        </div>
                        <div className="carousel-item">
                            <img src={homeImage} className="d-block w-100" alt="..."/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-8 col-sm-11 col-12 d-flex align-items-start flex-column mb-3">
                    <div className="col-12">
                        <div className="col-12 row d-flex justify-content-between mt-xl-0 mt-lg-0 mt-md-4 mt-sm-4 mt-4 align-items-center">
                            <h3 className="text-success col-3"><BiSolidCalendar/></h3>
                            <p className="col-9 fw-bold text-end">{checkIn} -> {checkOut}</p>
                        </div>
                        <hr className="text-black"/>
                        <div className="col-12 row d-flex justify-content-between align-items-center">
                            <h3 className="text-success col-3"><FaBed/></h3>
                            <p className="col-9 fw-bold text-end m-0 p-0">DOUBLE</p>
                        </div>
                        <hr/>
                        <div className="col-12 row d-flex justify-content-between align-items-center">
                            <h3 className="text-success col-3 "><BsFillHouseCheckFill/></h3>
                            <p className="col-9 fw-bold text-end m-0 p-0">Facilitati / facilitati / facilitati / Facilitati / facilitati / facilitati</p>
                        </div>
                        <hr/>
                        <div className="col-12 row d-flex justify-content-between align-items-center">
                            <p className="fw-bold text-success col-4">PRICE</p>
                            <p className="col-8 fw-bold text-end fs-5">800 RON</p>
                        </div>
                    </div>
                    <a onClick={() => navigate("/checkout")} className="btn btn-success col-12 mt-auto p-2 ">
                        Buy Now
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ViewDetails;