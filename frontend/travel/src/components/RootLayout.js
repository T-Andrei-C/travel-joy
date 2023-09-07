import { NavLink, Outlet } from "react-router-dom";

const RootLayout = () => {
    return(
        <div>
             <header>
                <nav>
                    <NavLink to="/" id="home">Home</NavLink>
                </nav>
             </header>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default RootLayout;