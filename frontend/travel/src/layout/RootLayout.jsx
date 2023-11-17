import {NavLink, Outlet} from "react-router-dom";
import Travel_Joy from "../components/img/Travel_Joy.svg"
import {BsFacebook, BsInstagram, BsTwitter} from "react-icons/bs";
import {useIsAuthenticated} from "react-auth-kit";
import {MdAccountCircle} from "react-icons/md";

const RootLayout = () => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-success sticky-top text-white" data-bs-theme="dark">
                <div className="container-fluid">
                    <NavLink to="/">
                        <img height={35} className="ps-2" src={Travel_Joy} alt="logo"/>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon text-white"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/accommodations/3/0" className="nav-link">Accommodations</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/packages/3/0" className="nav-link">Packages</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/aboutus" className="nav-link">About us</NavLink>
                            </li>
                            {isAuthenticated() ?
                                <li className="nav-item">
                                    <NavLink to="/myaccount" className="nav-link"><MdAccountCircle
                                        style={{fontSize: "1.8em"}}/></NavLink>
                                </li> :
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link">Log in</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/signup" className="nav-link">Sign up</NavLink>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            {/*<nav className="navbar navbar-expand-lg bg-body-tertiary">*/}
            {/*    <div className="container-fluid">*/}
            {/*        <a className="navbar-brand" href="#">Navbar</a>*/}
            {/*        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">*/}
            {/*            <span className="navbar-toggler-icon"></span>*/}
            {/*        </button>*/}
            {/*        <div className="collapse navbar-collapse" id="navbarSupportedContent">*/}
            {/*            <ul className="navbar-nav me-auto mb-2 mb-lg-0">*/}
            {/*                <li className="nav-item">*/}
            {/*                    <a className="nav-link active" aria-current="page" href="#">Home</a>*/}
            {/*                </li>*/}
            {/*                <li className="nav-item">*/}
            {/*                    <a className="nav-link" href="#">Link</a>*/}
            {/*                </li>*/}
            {/*                <li className="nav-item dropdown">*/}
            {/*                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">*/}
            {/*                        Dropdown*/}
            {/*                    </a>*/}
            {/*                    <ul className="dropdown-menu">*/}
            {/*                        <li><a className="dropdown-item" href="#">Action</a></li>*/}
            {/*                        <li><a className="dropdown-item" href="#">Another action</a></li>*/}
            {/*                        <li><hr className="dropdown-divider"/></li>*/}
            {/*                        <li><a className="dropdown-item" href="#">Something else here</a></li>*/}
            {/*                    </ul>*/}
            {/*                </li>*/}
            {/*                <li className="nav-item">*/}
            {/*                    <a className="nav-link disabled" aria-disabled="true">Disabled</a>*/}
            {/*                </li>*/}
            {/*            </ul>*/}
            {/*            <form className="d-flex" role="search">*/}
            {/*                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>*/}
            {/*                    <button className="btn btn-outline-success" type="submit">Search</button>*/}
            {/*            </form>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</nav>*/}
            <div className="root-layout" style={{minHeight: "91.5vh"}}>
                <header>
                </header>
                <main id="main" className="">
                    <Outlet/>
                </main>
            </div>
            <div className="container pt-5">
                <footer className="py-3 my-4">
                    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                        <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">Home</a></li>
                        <li className="nav-item"><a href="/aboutus" className="nav-link px-2 text-muted">About</a></li>
                        <li className="nav-item"><a href="/contact" className="nav-link px-2 text-muted">Contact</a>
                        </li>
                    </ul>
                    <div className="col-12 d-flex align-items-center justify-content-between">
                        <span className="text-muted">© 2023 Travel's Joy, Inc</span>
                        <ul className="nav  list-unstyled d-flex">
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