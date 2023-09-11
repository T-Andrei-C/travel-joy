import {NavLink, Outlet} from "react-router-dom";
import TravelJoy from "../components/img/TravelJoy.png"
import {GiHamburgerMenu} from "react-icons/gi"
import {useEffect, useState} from "react";

const RootLayout = () => {

    const [screenWidth, setScreenWidth] = useState(window.screen.width);
    useEffect(() => {
        window.addEventListener("resize", () => setScreenWidth(window.screen.width))
        // window.removeEventListener("resize", () => setScreenWidth(window.screen.width));
    }, [])

    return (
        <div className="root-layout">
            <header>
                <nav className="navbar bg-success" data-bs-theme="dark">
                    <NavLink to="/">
                        <img src={TravelJoy} alt="logo"/>
                    </NavLink>
                    {screenWidth <= 750 ?
                        <div>
                            <button id="hamburger-menu" className="text-white" data-bs-toggle="dropdown">
                                <GiHamburgerMenu/></button>
                            <ul className="dropdown-menu dropdown-menu-end bg-white">
                                <li>
                                    <NavLink to="/accommodations">
                                        <a id="nav-links" className="dropdown-item text-black">Accommodations</a>
                                    </NavLink></li>
                                <li>
                                    <NavLink to="/">
                                        <a id="nav-links" className="dropdown-item text-black">Packages</a>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/">
                                        <a id="nav-links" className="dropdown-item text-black">About us</a>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/">
                                        <a id="nav-links" className="dropdown-item text-black">Log in</a>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/">
                                        <a id="nav-links" className="dropdown-item text-black">Sign up</a>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        :
                        <div>
                            <NavLink to="/accommodations">
                                <a id="nav-links" className="nav-link">Accommodations</a>
                            </NavLink>
                            <NavLink to="/">
                                <a id="nav-links" className="nav-link">Packages</a>
                            </NavLink>
                            <NavLink to="/">
                                <a id="nav-links" className="nav-link">About us</a>
                            </NavLink>
                            <NavLink to="/">
                                <a id="nav-links" className="nav-link">Log in</a>
                            </NavLink>
                            <NavLink to="/">
                                <a id="nav-links" className="nav-link">Sign up</a>
                            </NavLink>
                        </div>
                    }
                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default RootLayout;