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
                        <NavLink to="/">
                            <a id="nav-links" className="nav-link">Features</a>
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