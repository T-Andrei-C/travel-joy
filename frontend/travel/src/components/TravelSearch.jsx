import {MdPeopleAlt} from "react-icons/md";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const TravelSearch = ({goingTo, checkIn, checkOut, numberOfPersons, type}) => {
    const [valueCheckIn, setValueCheckIn] = useState(checkIn);
    const [valueCheckOut, setValueCheckOut] = useState(checkOut);
    const navigate = useNavigate();
    const {itemsPerPage, numberOfPage} = useParams();

    useEffect(() => {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        if((checkOutDate.getTime() - checkInDate.getTime()) < 0) {
            navigate(`/${type}/${itemsPerPage}/0`);
            window.location.reload();
        }
    }, []);

    const getDate = (extraDays, extraYear) => {
        const date = new Date;
        date.setFullYear(date.getFullYear() + extraYear);
        date.setDate(date.getDate() + extraDays)

        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

        return `${year}-${month}-${day}`
    }

    const getSearchDate = (inputDate, extraDays) => {
        const date = new Date(inputDate);
        date.setDate(date.getDate() + extraDays)

        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();


        return `${year}-${month}-${day}`;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputSearch = {
            goingTo: formData.get("goingTo"),
            checkIn: formData.get("checkIn"),
            checkOut: formData.get("checkOut"),
            numberOfPersons: formData.get("numberOfPersons")
        };
        navigate(`/${type}/${inputSearch.goingTo}/${inputSearch.checkIn}/${inputSearch.checkOut}/${inputSearch.numberOfPersons}/${itemsPerPage}/0`)
    }

    return (
        <form className="p-5 m-0 row" id="key"  onSubmit={onSubmit}>
            <div className="form-floating col-md-3 col-12 m-0 p-0 ">
                <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}} htmlFor="floatingInputValue">GOING TO</label>
                <input type="text" name="goingTo" className="w-100 pt-4 ps-2 rounded-start-3" style={{ height: "58px", border: "1px solid #198754"}} required={true} defaultValue={goingTo}  />
            </div>
            <div className="form-floating col-md-3 col-12 m-0 p-0">
                <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}} htmlFor="floatingInputValue">CHECK-IN</label>
                <input id="startDate" name="checkIn" min={getDate(0, 0)} max={valueCheckOut !== undefined ? getSearchDate(valueCheckOut, -1) : getDate(0, 2)} className="fw-medium w-100 pt-4 ps-2 pe-2" style={{ height: "58px", border: "1px solid #198754"}} required={true} type="date" defaultValue={checkIn} onChange={(e) => setValueCheckIn(e.target.value)}/>
            </div>
            <div className="position-relative form-floating col-md-3 col-12 m-0 p-0">
                <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}} htmlFor="floatingInputValue">CHECK-OUT</label>
                <input id="startDate" name="checkOut" min={valueCheckIn !== undefined ? getSearchDate(valueCheckIn, 1) : getDate(1, 0)} max={getDate(1, 2)} className="fw-medium w-100 pt-4 ps-2 pe-2" style={{ height: "58px", border: "1px solid #198754"}} required={true} type="date" defaultValue={checkOut} onChange={(e) => setValueCheckOut(e.target.value)} />
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
                <button className="btn btn-outline-success ps-5 pe-5 col-9 lg rounded-end-3"  style={{borderRadius: "0"}} type="submit" id="button-addon2">Search</button>
            </div>
        </form>
    )
}

export default TravelSearch;