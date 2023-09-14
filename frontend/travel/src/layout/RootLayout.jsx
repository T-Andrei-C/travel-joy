import {NavLink, Outlet} from "react-router-dom";
import TravelJoy from "../components/img/TravelJoy.png"
import {BsFacebook, BsInstagram, BsTwitch, BsTwitter} from "react-icons/bs";

const RootLayout = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-success sticky-top text-white" data-bs-theme="dark">
                <div className="container-fluid">
                    <NavLink to="/">
                        <img height={35} className="ps-2" src={TravelJoy} alt="logo"/>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon text-white"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/accommodations" className="nav-link">Accommodations</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/packages" className="nav-link">Packages</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/aboutus" className="nav-link">About us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link">Log in</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/signup" className="nav-link">Sign up</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="root-layout" style={{minHeight: "91.5vh"}}>
                <header>
                </header>
                <main id="main">
                    <Outlet/>
                </main>
            </div>
            <div className="container pt-5">
                <footer className="py-3 my-4">
                    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                        <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">Home</a></li>
                        <li className="nav-item"><a href="/aboutus" className="nav-link px-2 text-muted">About</a></li>
                        <li className="nav-item"><a href="/contact" className="nav-link px-2 text-muted">Contact</a></li>
                    </ul>
                    <div className="col-12 d-flex align-items-center justify-content-between" >
                        <span className="text-muted">© 2023 Travel's Joy, Inc</span>
                        <ul className="nav  list-unstyled d-flex" >
                            <li className="ms-3"><a className="text-muted" href="#"><BsFacebook/></a></li>
                            <li className="ms-3"><a className="text-muted" href="#"><BsInstagram/></a></li>
                            <li className="ms-3"><a className="text-muted" href="#"><BsTwitter/></a></li>
                        </ul>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default RootLayout;