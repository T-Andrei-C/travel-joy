import dummyRoom1 from "./img/dummyRoom1.jpg";
import dummyRoom2 from "./img/dummyRoom2.jpg";
import dummyRoom3 from "./img/dummyRoom3.jpg";
import {BiSolidCalendar} from "react-icons/bi";
import {FaBed} from "react-icons/fa";
import {BsFillHouseCheckFill, BsSlash} from "react-icons/bs";
import {useEffect} from "react";
import {ITEMS_PER_PAGE} from "../service/API";
import {totalPrice} from "../service/PaymentService";

const ViewDetailsCard = ({room, checkIn, checkOut, navigate, destination, accommodationName}) => {

    useEffect(() => {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        if((checkOutDate.getTime() - checkInDate.getTime()) < 0) {
            navigate(`/accommodations/${ITEMS_PER_PAGE}/0`);
            window.location.reload();
        }
    }, []);

    console.log(room)

    return (
        <>
            <div id="carouselExampleIndicators" className="col-xl-7 col-lg-7 col-md-8 col-sm-11 col-12 carousel slide carousel-fade mt-5">
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
                        <img src={dummyRoom1} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={dummyRoom2} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={dummyRoom3} className="d-block w-100" alt="..."/>
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
            <div className="col-xl-5 col-lg-5 col-md-8 col-sm-11 col-12 d-flex align-items-start flex-column mb-3 mt-lg-5">
                <div className="col-12">
                    <div
                        className="col-12 row d-flex justify-content-between mt-xl-0 mt-lg-0 mt-md-4 mt-sm-4 mt-4 align-items-center">
                        <h3 className="text-success col-3"><BiSolidCalendar/></h3>
                        <p className="col-9 fw-bold text-end m-0 p-0">{checkIn} -> {checkOut}</p>
                    </div>
                    <hr className="text-black"/>
                    <div className="col-12 row d-flex justify-content-between align-items-center">
                        <h3 className="text-success col-3"><FaBed/></h3>
                        <p className="col-9 fw-bold text-end m-0 p-0">{room.type}</p>
                    </div>
                    <hr/>
                    <div className="col-12 row d-flex justify-content-between align-items-center">
                        <h3 className="text-success col-3 "><BsFillHouseCheckFill/></h3>
                        <p className="col-9 fw-bold text-end m-0 p-0">
                            {room.room_facilities?.map(facility => (
                                facility.name === room.room_facilities[room.room_facilities.length - 1].name ?
                                    <span> {facility.name.toUpperCase()} </span> :
                                    <span> {facility.name.toUpperCase()}<BsSlash/></span>
                            ))
                            }
                        </p>
                    </div>
                    <hr/>
                    <div className="col-12 row d-flex justify-content-between align-items-center">
                        <p className="fw-bold text-success col-4">PRICE</p>
                        <p className="col-8 fw-bold text-end fs-5">{totalPrice(checkIn, checkOut) * room.price} RON</p>
                    </div>
                </div>
                <a onClick={() => navigate(`/checkout/${destination}/${accommodationName}/${room.id}/${checkIn}/${checkOut}/${totalPrice(checkIn, checkOut) * room.price}`)} className="btn btn-success col-12 mt-auto p-2 ">
                    Buy Now
                </a>
            </div>
        </>
    )
}

export default ViewDetailsCard;