import {NavLink, Outlet, useNavigate} from "react-router-dom";
import Travel_Joy from "../components/img/Travel_Joy.svg"
import {BsFacebook, BsInstagram, BsTwitter} from "react-icons/bs";
import {useIsAuthenticated} from "react-auth-kit";
import {MdAccountCircle} from "react-icons/md";
import {FaPowerOff} from "react-icons/fa";

const RootLayout = () => {
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();


    const logOut = () => {
        document.cookie = "_auth_state=logout";
        navigate("/");
        window.location.reload();
    }

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
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/myaccount" className="nav-link"><MdAccountCircle
                                            style={{fontSize: "1.8em"}}/></NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <button data-bs-toggle="modal"
                                                data-bs-target="#logout"
                                                className="nav-link"><FaPowerOff
                                            style={{fontSize: "1.5em"}}/></button>
                                    </li>
                                </>
                                :
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

            <div className="modal fade" id="logout" tabIndex="-1"
                 aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header position-relative">
                            <h1 className="modal-title fs-5 position-absolute top-50 start-50 translate-middle" id="exampleModalLabel">Verify Logout</h1>
                            <button type="button" className="btn-close d-flex align-content-end" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center">Are you sure you want to log out? You may lose unsaved progress. </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <button onClick={logOut} type="button" className="btn btn-success"
                                    data-bs-dismiss="modal">Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RootLayout;