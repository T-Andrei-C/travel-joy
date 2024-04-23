import {NavLink, Outlet} from "react-router-dom";

const AdminPanel = () => {
    return (
        // <nav className="container-fluid text-white col-12" data-bs-theme="dark">
        //     <div className="row flex-nowrap ">
        //         <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-success position-fixed">
        //             <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
        //                 <ul className="navbar-nav fs-6 flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
        //                     <li className="nav-item">
        //                         {/*<a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">*/}
        //                         {/*    <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </a>*/}
        //                     </li>
        //                     <li className="nav-item">
        //                         <NavLink to="hotels" className="nav-link px-0 align-middle">Hotels</NavLink>
        //                     </li>
        //                     <li className="nav-item">
        //                         <NavLink to="lalala" className="nav-link px-0 align-middle">Rooms</NavLink>
        //                     </li>
        //                     <li className="nav-item">
        //
        //                     </li>
        //                 </ul>
        //             </div>
        //         </div>
        //         <div className="col py-3 position-relative bg-danger">
        //             <Outlet/>
        //         </div>
        //     </div>
        // </nav>
        <div>
            <div className="offcanvas offcanvas-start w-25" tabindex="-1" id="offcanvas" data-bs-keyboard="false"
                 data-bs-backdrop="false">
                <div className="offcanvas-header">
                    <h6 className="offcanvas-title d-none d-sm-block" id="offcanvas">Menu</h6>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                </div>
                <div className="offcanvas-body px-0">
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                        <li className="nav-item">
                            <a href="#" className="nav-link text-truncate">
                                <i className="fs-5 bi-house"></i><span className="ms-1 d-none d-sm-inline">Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="#submenu1" data-bs-toggle="collapse" className="nav-link text-truncate">
                                <i className="fs-5 bi-speedometer2"></i><span
                                className="ms-1 d-none d-sm-inline">Dashboard</span> </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link text-truncate">
                                <i className="fs-5 bi-table"></i><span className="ms-1 d-none d-sm-inline">Orders</span></a>
                        </li>
                        <li className="dropdown">
                            <a href="#" className="nav-link dropdown-toggle  text-truncate" id="dropdown"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fs-5 bi-bootstrap"></i><span
                                className="ms-1 d-none d-sm-inline">Bootstrap</span>
                            </a>
                            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdown">
                                <li><a className="dropdown-item" href="#">New project...</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li><a className="dropdown-item" href="#">Sign out</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" className="nav-link text-truncate">
                                <i className="fs-5 bi-grid"></i><span
                                className="ms-1 d-none d-sm-inline">Products</span></a>
                        </li>
                        <li>
                            <a href="#" className="nav-link text-truncate">
                                <i className="fs-5 bi-people"></i><span
                                className="ms-1 d-none d-sm-inline">Customers</span> </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col min-vh-100 py-3">
                        <button className="btn float-end" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"
                                role="button">
                            <i className="bi bi-arrow-right-square-fill fs-3" data-bs-toggle="offcanvas"
                               data-bs-target="#offcanvas"></i>
                        </button>
                        Content..
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel;