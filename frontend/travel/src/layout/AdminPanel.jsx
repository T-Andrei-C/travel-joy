import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {FaHotel} from "react-icons/fa";
import {BiSolidBed, BiSolidDiscount} from "react-icons/bi";
import {MdLocalOffer, MdOutlineViewCarousel} from "react-icons/md";
import {FaTreeCity} from "react-icons/fa6";
import {BsFillHouseCheckFill} from "react-icons/bs";
import {useEffect, useState} from "react";
import Travel_Joy from "../components/img/Travel_Joy.svg";
import Travel_Joy_Tiny from "../components/img/TravelJoyTinyLogo.png";
import {getAuthUser} from "../service/CRUDUsers";
import SideBarElement from "../components/admin/SideBarElement";

const AdminPanel = () => {
    const [url, setUrl] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getAuthUser().then(user => {
            if (user.role.name !== "ROLE_ADMIN") {
                navigate("/");
            }
        }).catch(err => navigate("/login"))
        setUrl(window.location.pathname.substring(7));
    }, [])

    return (
        <nav className="col-12 row row-cols-2 m-0">
            <div className="col-xl-1 col-lg-2 col-md-2 col-3 p-0">
                <div className="bg-success position-fixed col-xl-1 col-xl-1 col-lg-2 col-md-2 col-3 h-100 text-white">
                    <div className=" d-flex justify-content-center">
                        <button className="border-0 bg-transparent">
                            <NavLink to="/" className="nav-item nav-link d-flex justify-content-center">
                                <img height={35} className="mt-3 mb-3 d-sm-block d-none " src={Travel_Joy}
                                     alt="logo"/>
                                <img height={25} className="mt-3 mb-3 d-xl-none d-md-none d-lg-none d-sm-none d-block"
                                     src={Travel_Joy_Tiny} alt="logo"/>
                            </NavLink>
                        </button>
                    </div>
                    <ul className="navbar-nav list-group list-group-flush overflow-auto" style={{height: "90%"}}>
                        <SideBarElement to="hotels" name="Hotels" icon={<FaHotel className="fs-5"/>} url={url} setUrl={setUrl}/>
                        <SideBarElement to="hotel/facilities" name="Hotel Facilities" icon={<BsFillHouseCheckFill className="fs-4"/>} url={url} setUrl={setUrl}/>
                        <SideBarElement to="roomTypes" name="Room Types" icon={<MdLocalOffer className="fs-4"/>} url={url} setUrl={setUrl}/>
                        <SideBarElement to="room/facilities" name="Room Facilities" icon={<BsFillHouseCheckFill className="fs-4"/>} url={url} setUrl={setUrl}/>
                        <SideBarElement to="roomOfferTypes" name="Room Offer Types" icon={<BiSolidBed className="fs-4"/>} url={url} setUrl={setUrl}/>
                        <SideBarElement to="cities" name="Cities" icon={<FaTreeCity className="fs-4"/>} url={url} setUrl={setUrl}/>
                        <SideBarElement to="discounts" name="Discounts" icon={<BiSolidDiscount className="fs-4"/>} url={url} setUrl={setUrl}/>
                        <SideBarElement to="carousel" name="Carousel" icon={<MdOutlineViewCarousel className="fs-3"/>} url={url} setUrl={setUrl}/>
                    </ul>
                </div>
            </div>
            <div className="col-xl-11 col-lg-10 col-md-10 col-9 p-3 position-relative">
                <Outlet/>
            </div>
        </nav>
    )
}

export default AdminPanel;