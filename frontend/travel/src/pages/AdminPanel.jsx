import {NavLink, Outlet} from "react-router-dom";
import {FaHotel} from "react-icons/fa";
import {BiSolidBed, BiSolidDiscount} from "react-icons/bi";
import {MdLocalOffer, MdOutlineViewCarousel} from "react-icons/md";
import {FaTreeCity} from "react-icons/fa6";
import {BsFillHouseCheckFill} from "react-icons/bs";
import {useEffect, useState} from "react";
import Travel_Joy from "../components/img/Travel_Joy.svg";
import Travel_Joy_Tiny from "../components/img/TravelJoyTinyLogo.png";

const AdminPanel = () => {
    const [url, setUrl] = useState("");
    // const link = window.location.pathname;

    useEffect(() => {
        // setUrl(window.location.pathname);
    }, [])

    return (
        <nav className="col-12 d-flex justify-content-between">
            <div className="col-xl-1 col-2">
                <div className="bg-success position-fixed col-xl-1 col-2 min-vh-100 text-white">
                    <ul className="navbar-nav fs-5">
                        <button className={`btn btn-success rounded-0 ${url.includes("hotels") && "active"}`}>
                            <NavLink to="/" className="nav-item nav-link d-flex justify-content-center">
                                <img height={35} className="mt-3 mb-3 d-md-block d-none" src={Travel_Joy} alt="logo"/>
                                <img height={25} className="mt-3 mb-3 d-xl-none d-md-none d-lg-none d-block"
                                     src={Travel_Joy_Tiny} alt="logo"/>
                            </NavLink>
                        </button>
                        <button className={`btn btn-success rounded-0 ${url.includes("hotels") && "active"}`}>
                            <NavLink to="hotels" className="nav-item nav-link text-center">
                                <p className="m-0"><FaHotel/></p>
                                <p className="m-0 d-md-block d-none">Hotels</p>
                            </NavLink>
                        </button>
                        <button className="btn btn-success rounded-0">
                            <NavLink to="hotel/facilities" className="nav-item nav-link text-center">
                                <p className="m-0 fs-5"><BsFillHouseCheckFill/></p>
                                <p className="m-0 d-md-block d-none">Hotel Facilities</p>
                            </NavLink>
                        </button>
                        <button className="btn btn-success rounded-0">
                            <NavLink to="room/facilities" className="nav-item nav-link text-center">
                                <p className="m-0 fs-5"><BsFillHouseCheckFill/></p>
                                <p className="m-0 d-md-block d-none">Room Facilities</p>
                            </NavLink>
                        </button>
                        <button className="btn btn-success rounded-0">
                            <NavLink to="roomOfferTypes" className="nav-item nav-link text-center">
                                <p className="m-0 fs-4"><BiSolidBed/></p>
                                <p className="m-0 d-md-block d-none">Room Offer Types</p>
                            </NavLink>
                        </button>
                        <button className="btn btn-success rounded-0">
                            <NavLink to="roomTypes" className="nav-item nav-link text-center">
                                <p className="m-0 fs-5"><MdLocalOffer/></p>
                                <p className="m-0 d-md-block d-none">Room Types</p>
                            </NavLink>
                        </button>
                        {/*<button className="btn btn-success rounded-0">*/}
                        {/*    <NavLink to="hotels" className="nav-item nav-link text-center">*/}
                        {/*        <p className="m-0"><MdLocalOffer/></p>*/}
                        {/*        <p className="m-0">Countries</p>*/}
                        {/*    </NavLink>*/}
                        {/*</button>*/}
                        <button className="btn btn-success rounded-0">
                            <NavLink to="cities" className="nav-item nav-link text-center">
                                <p className="m-0 fs-5"><FaTreeCity/></p>
                                <p className="m-0 d-md-block d-none">Cities</p>
                            </NavLink>
                        </button>
                        <button className="btn btn-success rounded-0">
                            <NavLink to="discounts" className="nav-item nav-link text-center">
                                <p className="m-0 fs-4"><BiSolidDiscount/></p>
                                <p className="m-0 d-md-block d-none">Discounts</p>
                            </NavLink>
                        </button>
                        <button className="btn btn-success rounded-0">
                            <NavLink to="carousel" className="nav-item nav-link text-center">
                                <p className="m-0 fs-2"><MdOutlineViewCarousel /></p>
                                <p className="m-0 d-md-block d-none">Carousel</p>
                            </NavLink>
                        </button>
                    </ul>
                </div>
            </div>
            <div className="col-xl-11 col-10 p-3 position-relative">
                <Outlet/>
            </div>
        </nav>
    )
}

export default AdminPanel;