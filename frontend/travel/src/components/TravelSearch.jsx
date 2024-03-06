import {MdPeopleAlt} from "react-icons/md";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import InfoPopup from "./InfoPopup";

const TravelSearch = ({goingTo, checkIn, checkOut, numberOfPersons, type}) => {
    const [invalidCheckOut, setInvalidCheckOut] = useState(false);
    const navigate = useNavigate();
    const {itemsPerPage, numberOfPage} = useParams();

    const onSubmit = (e) => {
        setInvalidCheckOut(false);
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputSearch = {
            goingTo: formData.get("goingTo"),
            checkIn: formData.get("checkIn"),
            checkOut: formData.get("checkOut"),
            numberOfPersons: formData.get("numberOfPersons")
        };
        const checkInDate = new Date(inputSearch.checkIn);
        const checkOutDate = new Date(inputSearch.checkOut);
        if((checkOutDate.getTime() - checkInDate.getTime()) > 0){
            navigate(`/${type}/${inputSearch.goingTo}/${inputSearch.checkIn}/${inputSearch.checkOut}/${inputSearch.numberOfPersons}/${itemsPerPage}/0`)
        }else{
            setInvalidCheckOut(true);
        }

    }

    return (
        <form className="p-5 m-0 row" id="key"  onSubmit={onSubmit}>
            <div className="form-floating col-md-3 col-12 m-0 p-0 ">
                <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}} htmlFor="floatingInputValue">GOING TO</label>
                <input type="text" name="goingTo" className="w-100 pt-4 ps-2 rounded-start-3" style={{ height: "58px", border: "1px solid #198754"}} required={true} defaultValue={goingTo}  />
            </div>
            <div className="form-floating col-md-3 col-12 m-0 p-0">
                <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}} htmlFor="floatingInputValue">CHECK-IN</label>
                <input id="startDate" name="checkIn" className="fw-medium w-100 pt-4 ps-2 pe-2" style={{ height: "58px", border: "1px solid #198754"}} required={true} type="date" defaultValue={checkIn}/>
            </div>
            <div className="position-relative form-floating col-md-3 col-12 m-0 p-0">
                <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}} htmlFor="floatingInputValue">CHECK-OUT</label>
                <input id="startDate" name="checkOut"   className="fw-medium w-100 pt-4 ps-2 pe-2" style={{ height: "58px", border: "1px solid #198754"}} required={true} type="date" defaultValue={checkOut} />
            </div>
            <div className=" form-floating row m-0 p-0 col-md-3 col-12">
                <label className="pt-0 text-white fw-bold" style={{fontSize: "1.15em"}} htmlFor="floatingInputValue"><MdPeopleAlt/></label>
                <select required={true} name="numberOfPersons"  className="btn-outline-success bg-success text-white pt-4 ps-2 pe-2 col-3 " style={{border: "1px solid #198754"}} defaultValue={numberOfPersons}>
                    <option value="" hidden={true}></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button className="btn btn-outline-success ps-5 pe-5 col-9 lg rounded-end-3"  style={{borderRadius: "0"}} type="submit" id="button-addon2"  data-bs-toggle={invalidCheckOut ? "" : "modal"}
                        data-bs-target="#invalidPeriodOfTime">Search</button>
            </div>
            <div className="my-auto col-xl-4 col-12 ">
                <InfoPopup id="invalidPeriodOfTime"
                           header="Oops! Invalid period of time!"
                           content="Please fill in the input with relevant information for check-in and check-out dates!"/>
            </div>
        </form>
    )
}

export default TravelSearch;