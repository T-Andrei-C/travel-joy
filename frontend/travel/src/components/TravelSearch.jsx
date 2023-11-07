import {FaLocationDot} from "react-icons/fa6";
import {MdPeopleAlt} from "react-icons/md";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

const TravelSearch = ({goingTo, checkIn, checkOut, numberOfPersons,type}) => {

    const navigate = useNavigate();
    const {itemsPerPage, numberOfPage} = useParams();

    const onSubmit = (e) => {
        e.preventDefault();
        navigate(`/${type}/${e.target[0].value}/${e.target[1].value}/${e.target[2].value}/${e.target[3].value}/${itemsPerPage}/0`)
    }

    return (
        <form className=" p-5 row" id="test"  onSubmit={onSubmit}>
            {/*<div className="form-floating col-md-1 col-12 m-0 p-0">*/}
            {/*    <span className="bg-white border-success col-1" id="basic-addon1"><FaLocationDot/></span>*/}
            {/*</div>*/}
            <div className="form-floating col-md-3 col-12 m-0 p-0">
                <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}} htmlFor="floatingInputValue">GOING TO</label>
                <input type="text" className="w-100 pt-4 ps-2" style={{ height: "58px", border: "1px solid #198754"}} required={true} defaultValue={goingTo}  />
            </div>
            <div className="form-floating col-md-3 col-12 m-0 p-0">
                <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}} htmlFor="floatingInputValue">CHECK-IN</label>
                <input id="startDate" className="fw-medium w-100 pt-4 ps-2 pe-2" style={{ height: "58px", border: "1px solid #198754"}} required={true} type="date" defaultValue={checkIn}/>
            </div>
            <div className="form-floating col-md-3 col-12 m-0 p-0">
                <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}} htmlFor="floatingInputValue">CHECK-OUT</label>
                <input id="startDate" className="fw-medium w-100 pt-4 ps-2 pe-2" style={{ height: "58px", border: "1px solid #198754"}} required={true} type="date" defaultValue={checkOut}/>
            </div>
            <div className="row m-0 p-0 col-md-3 col-12">
                <select required={true} className="btn-outline-success bg-success text-white col-3" style={{border: "1px solid #198754"}} defaultValue="Amount">
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
                <button className="btn btn-outline-success ps-5 pe-5 col-9" style={{borderRadius: "0"}} type="submit" id="button-addon2">Search</button>
            </div>
        </form>
    )
}

export default TravelSearch;