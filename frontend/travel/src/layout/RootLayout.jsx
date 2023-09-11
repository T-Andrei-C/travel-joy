import {NavLink, Outlet} from "react-router-dom";
import TravelJoy from "../components/img/TravelJoy.png"

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
                                <NavLink to="/" className="nav-link">Packages</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">About us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">Log in</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">Sign up</NavLink>
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
            <footer style={{height: "15vh"}} className="bg-black w-100">
                <a className="text-white">About us</a>
                <div className="container text-white">
                    <p>&copy; {new Date().getFullYear()} Travel Joy. All Rights Reserved.</p>
                </div>
            </footer>
        </>
    )
}

export default RootLayout;