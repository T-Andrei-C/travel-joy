import {MdPeopleAlt} from "react-icons/md";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import DatePicker, {DateObject} from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/green.css"
import {BiSolidCalendar} from "react-icons/bi";
import {
    PiArrowElbowLeftUpBold,
    PiArrowElbowRightDownBold,
} from "react-icons/pi";

const TravelSearch = ({goingTo, checkIn, checkOut, numberOfPersons, type}) => {
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const navigate = useNavigate();
    const {itemsPerPage, numberOfPage} = useParams();

    const [values, setValues] = useState([])

    useEffect(() => {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if ((checkOutDate.getTime() - checkInDate.getTime()) < 0) {
            navigate(`/${type}/${itemsPerPage}/0`);
            window.location.reload();
        }

    }, []);

    const getCheckIn = () => {
        if (values[0] !== undefined){
            const month = values[0].month.number < 10 ? `0${values[0].month.number}` : values[0].month.number;
            const day = values[0].day < 10 ? `0${values[0].day}` : values[0].day;
            return `${values[0].year}-${month}-${day}`;
        } else {
            return checkIn === undefined ? "yyyy-mm-dd" : checkIn;
        }
    }

    const getCheckOut = () => {
        if (values[1] !== undefined){
            const month = values[1].month.number < 10 ? `0${values[1].month.number}` : values[1].month.number;
            const day = values[1].day < 10 ? `0${values[1].day}` : values[1].day;
            setButtonDisabled(false);
            return `${values[1].year}-${month}-${day}`;
        } else {
            setButtonDisabled(true);
            return checkOut === undefined ? "yyyy-mm-dd" : checkOut;
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const inputSearch = {
            goingTo: formData.get("goingTo"),
            numberOfPersons: formData.get("numberOfPersons")
        };
        navigate(`/${type}/${inputSearch.goingTo}/${getCheckIn()}/${getCheckOut()}/${inputSearch.numberOfPersons}/${itemsPerPage}/0`)
    }

    return (
        <form className="p-5 m-0 row col-md-9 col-12" id="key" onSubmit={onSubmit}>
            <div className="form-floating col-md-4 col-12 m-0 p-0 ">
                <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}} htmlFor="floatingInputValue">GOING
                    TO</label>
                <input type="text" name="goingTo" className="w-100 pt-4 ps-2 rounded-start-3"
                       style={{height: "58px", border: "1px solid #198754"}} required={true} defaultValue={goingTo}/>
            </div>
            <div className="form-floating col-md-4 col-12 m-0 p-0">
                <div className="fw-medium w-100 pt-1 d-flex justify-content-between pe-1"
                     style={{height: "58px", border: "1px solid #198754"}}>
                    <DatePicker
                        value={values}
                        onChange={setValues}
                        range
                        minDate={new DateObject()}
                        maxDate={new DateObject().add(1, "year")}
                        format={"YYYY-MM-DD"}
                        className="green"
                        render={(value, openCalendar) => {
                            return (
                                <button type="button" className="border-0 bg-transparent fw-bold" style={{width: "8em"}} onClick={openCalendar}>
                                    <div>
                                        {getCheckIn()}
                                        {<PiArrowElbowRightDownBold className="text-success"/>}
                                    </div>
                                    <div>
                                        {<PiArrowElbowLeftUpBold className="mb-2 text-success"/>}
                                        {getCheckOut()}
                                    </div>
                                </button>
                            )
                        }}
                    />
                    <div className="p-md-0 pt-1 fs-3 text-success d-xl-block d-lg-block d-md-none d-sm-block d-block">
                        <p><BiSolidCalendar/></p>
                    </div>
                </div>
            </div>
            <div className="form-floating row m-0 p-0 col-md-4 col-12">
                <label className="pt-0 text-white fw-bold" style={{fontSize: "1.15em"}}
                       htmlFor="floatingInputValue"><MdPeopleAlt/></label>
                <select required={true} name="numberOfPersons"
                        className="btn-outline-success bg-success text-white pt-4 ps-2 pe-2 col-3 "
                        style={{border: "1px solid #198754"}} defaultValue={numberOfPersons}>
                    <option value="" hidden={true}></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button className="btn btn-outline-success ps-5 pe-5 col-9 lg rounded-end-3" style={{borderRadius: "0"}}
                        type="submit" id="button-addon2" disabled={buttonDisabled}>Search
                </button>
            </div>
        </form>
    )
}

export default TravelSearch;