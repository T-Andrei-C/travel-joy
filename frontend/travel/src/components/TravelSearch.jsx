import {FaLocationDot} from "react-icons/fa6";
import {MdPeopleAlt} from "react-icons/md";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

const TravelSearch = ({goingTo, checkIn, checkOut, numberOfPersons}) => {

    const navigate = useNavigate();
    const {itemsPerPage, numberOfPage} = useParams();

    const onSubmit = (e) => {
        e.preventDefault();
        navigate(`/accommodations/${e.target[0].value}/${itemsPerPage}/${numberOfPage}/${e.target[1].value}/${e.target[2].value}/${e.target[3].value}`)
    }

    return (
    <form className="input-group p-5" onSubmit={onSubmit}>
        <span className="input-group-text bg-white border-success" id="basic-addon1"><FaLocationDot/></span>
        <div className="form-floating">
            <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}} htmlFor="floatingInputValue">GOING TO</label>
            <input type="text" className="form-control border-success" id="floatingInputValue" required={true} value={goingTo} />
        </div>
        <div className="form-floating">
            <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}} htmlFor="floatingInputValue">CHECK-IN</label>
            <input id="startDate" className="form-control border-success fw-medium" required={true} type="date" value={checkIn}/>
        </div>
        <div className="form-floating">
            <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}} htmlFor="floatingInputValue">CHECK-OUT</label>
            <input id="startDate" className="form-control border-success fw-medium" required={true} type="date" value={checkOut}/>
        </div>
        <select required={true} className="btn btn-outline-success bg-success text-white" defaultValue="Amount">
            {/*<option selected={true} disabled={true} hidden={true}><MdPeopleAlt/></option>*/}
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        {/*<button list="peopleAmount" className="btn btn-outline-success dropdown-toggle bg-success text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false"><MdPeopleAlt/></button>*/}
        {/*<ul className="dropdown-menu dropdown-menu-end border-success">*/}
        {/*    <li onClick={() => setSelectedOption("1")}><a data-value="1" className="dropdown-item">1</a></li>*/}
        {/*    <li><a className="dropdown-item">2</a></li>*/}
        {/*    <li><a className="dropdown-item">3</a></li>*/}
        {/*    <li><a className="dropdown-item">4</a></li>*/}
        {/*    <li><a className="dropdown-item">5</a></li>*/}
        {/*</ul>*/}
        <button className="btn btn-outline-success ps-5 pe-5" type="submit" id="button-addon2">Search</button>
    </form>
    )
}

export default TravelSearch;