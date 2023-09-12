import {useState,useEffect} from "react";
import {getAccommodations} from "../service/CRUDAccommodations";
import testImage from "../components/img/homeImage.jpg";
import {FaLocationDot} from "react-icons/fa6"
import {MdPeopleAlt} from "react-icons/md"

const Accommodations = () =>{
    const[accommodations,setAccommodations] = useState([]);

    useEffect(() => {
        getAccommodations()
            .then((accommodations) => {
                setAccommodations(accommodations);
            })
    }, []);

    return (
        <>
            <div className="h-100 d-flex align-items-center justify-content-center pt-5">
                <h1 className="fw-medium">Search for Accommodations</h1>
            </div>
            <div className="input-group p-5">
                <span className="input-group-text bg-white" id="basic-addon1"><FaLocationDot/></span>
                <div className="form-floating">
                    <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}} htmlFor="floatingInputValue">GOING TO</label>
                    <input type="text" className="form-control" id="floatingInputValue" aria-placeholder="Search for city..." />
                </div>
                <div className="form-floating">
                    <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}} htmlFor="floatingInputValue">CHECK-IN</label>
                    <input id="startDate" className="form-control" type="date" />
                </div>
                <div className="form-floating">
                    <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}} htmlFor="floatingInputValue">CHECK-OUT</label>
                    <input id="startDate" className="form-control" type="date" />
                </div>
                <button className="btn btn-outline-secondary dropdown-toggle bg-success text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false"><MdPeopleAlt/></button>

                <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item">Hotels</a></li>
                    <li><a className="dropdown-item">Packages</a></li>
                </ul>
                <button className="btn btn-outline-success ps-5 pe-5" type="button" id="button-addon2">Search</button>
            </div>


        <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center  ms-1 me-1">
                {accommodations.length !== 0 &&
                    accommodations.map((a) => (
                        <div key={a.id} className="card col-12 col-md-10 col-lg-8 border-success m-3">
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src={testImage} className="card-img" alt={a.name} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h3 className="card-title text-success">{a.name}</h3>
                                        <h6 className="card-title text-success">{a.city.name}</h6>
                                        <hr className="border-success" />
                                        <p className="card-text">
                                            This is a wider card with supporting text below as a natural lead-in to additional content. This
                                            content is a little bit longer.
                                        </p>
                                        <a href="#" className="btn btn-success float-md-end mb-3">
                                            View Details
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>

        </>
    );

}

 export default Accommodations