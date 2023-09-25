import {FaLocationDot} from "react-icons/fa6";
import {MdPeopleAlt} from "react-icons/md";

const TravelSearch = ({goingTo}) => {

    

    return (
    <div className="input-group p-5">
        <span className="input-group-text bg-white border-success" id="basic-addon1"><FaLocationDot/></span>
        <div className="form-floating">
            <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}} htmlFor="floatingInputValue">GOING TO</label>
            <input type="text" className="form-control border-success" id="floatingInputValue" value={goingTo} />
        </div>
        <div className="form-floating">
            <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}} htmlFor="floatingInputValue">CHECK-IN</label>
            <input id="startDate" className="form-control border-success fw-medium" type="date" />
        </div>
        <div className="form-floating">
            <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}} htmlFor="floatingInputValue">CHECK-OUT</label>
            <input id="startDate" className="form-control border-success fw-medium" type="date" />
        </div>
        <button className="btn btn-outline-success dropdown-toggle bg-success text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false"><MdPeopleAlt/></button>

        <ul className="dropdown-menu dropdown-menu-end border-success">
            <li><a className="dropdown-item">1</a></li>
            <li><a className="dropdown-item">2</a></li>
            <li><a className="dropdown-item">3</a></li>
            <li><a className="dropdown-item">4</a></li>
            <li><a className="dropdown-item">5</a></li>
        </ul>
        <button className="btn btn-outline-success ps-5 pe-5" type="button" id="button-addon2">Search</button>
    </div>
    )
}

export default TravelSearch;