import {useNavigate, useParams} from "react-router-dom";
import homeImage from "../components/img/homeImage.jpg"
import {BiSolidCalendar} from "react-icons/bi";
import {FaBed} from "react-icons/fa";
import {BsFillHouseCheckFill} from "react-icons/bs";
import {FaLocationDot} from "react-icons/fa6";

const ViewDetails = () => {
    const navigate = useNavigate();
    const {destination, name, checkIn, checkOut, numberOfPersons} = useParams();
    return (
        <div className="justify-content-center align-items-center row p-0 m-0">
            <div className=" col-9 mt-3 me-4">
                <h2>{name}</h2>
                <h6 className="text-success"><FaLocationDot/> {destination}</h6>
            </div>
            <div className="col-10 row ps-5 pe-5 ">
                <div id="carouselExampleIndicators" className="col-8 carousel slide carousel-fade ">
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
                <div className="col-4 position-relative">
                    <div className="col-12 bg-black bg-opacity-10 position-absolute top-0 start-50 translate-middle-x rounded-3">
                        <div className="text-success col-12 row d-flex justify-content-center">
                            <h3 className="col-5"><BiSolidCalendar/></h3>
                            <p className="col-7">{checkIn} -> {checkOut}</p>
                        </div>
                        <hr className="text-black"/>
                        <div className="col-12 row text-success">
                            <h3 className="col-5"><FaBed/></h3>
                            <p className="col-7">DOUBLE</p>
                        </div>
                        <hr/>
                        <div className="col-12 row text-success">
                            <h3 className="col-5"><BsFillHouseCheckFill/></h3>
                            <p className="col-7">Facilitati</p>
                        </div>
                        <hr/>
                        <div>Price</div>
                    </div>
                    <a onClick={() => navigate("/checkout")} className="text- btn btn-success col-12 position-absolute bottom-0 start-50 translate-middle-x">
                        Buy Now
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ViewDetails;