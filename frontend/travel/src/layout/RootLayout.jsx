import { NavLink, Outlet } from "react-router-dom";
import TravelJoy from "../components/img/TravelJoy.png"

const RootLayout = () => {
    return(
        <div className="root-layout">
             <header>
                <nav className="navbar bg-success" data-bs-theme="dark">
                    <NavLink to="/">
                        <img src={TravelJoy} alt="logo"/>
                    </NavLink>
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
                </nav>
             </header>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default RootLayout;