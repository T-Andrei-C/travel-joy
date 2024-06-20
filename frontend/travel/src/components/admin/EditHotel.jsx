import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    addAccommodationImage, checkAccommodationCapacity,
    getAccommodationImage,
    getAllAccommodationById,
    updateAccommodation
} from "../../service/CRUDAccommodations";
import FormInput from "../FormInput";
import {getCities} from "../../service/CRUDCity";
import {FaEdit, FaPlus} from "react-icons/fa";
import {disableOrEnableRoom, getRoomImage, getRoomsByAccommodationId} from "../../service/CRUDRooms";
import {getAllNonMatchingAccommodationFacilities} from "../../service/CRUDAccommodationFacilities";
import Alert from "../Alert";
import {verifyFile} from "../../service/ImageService";
import CheckboxInput from "./CheckboxInput";

const EditHotel = () => {
    const [accommodation, setAccommodation] = useState(null);
    const [cities, setCities] = useState(null);
    const [rooms, setRooms] = useState(null);
    const [nonMatchingFacilities, setNonMatchingFacilities] = useState(null);
    const {id} = useParams();
    const [addFacility, setAddFacility] = useState(false);
    const [changedAccommodation, setChangedAccommodation] = useState(null);
    const [alert, setAlert] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllAccommodationById(id).then(accommodation => {
            setAccommodation(accommodation);
        })
        getCities().then(cities => {
            setCities(cities);
        })
        getRoomsByAccommodationId(id).then(rooms => {
            setRooms(rooms);
        })
        getAllNonMatchingAccommodationFacilities(id).then(facilities => {
            setNonMatchingFacilities(facilities);
        })
    }, [])

    const addAccommodationFacility = (e) => {
        const facility = nonMatchingFacilities.filter(f => f.id + "" === e.target.value)[0];

        accommodation.accommodation_facilities.push(facility);
        nonMatchingFacilities.splice(nonMatchingFacilities.indexOf(facility), 1);

        setChangedAccommodation(`updated facilities with ${e.target.value}`);
    }

    const removeAccommodationFacility = (e) => {
        const facility = accommodation.accommodation_facilities.filter(f => f.id + "" === e.target.value)[0];

        accommodation.accommodation_facilities.splice(accommodation.accommodation_facilities.indexOf(facility), 1);
        nonMatchingFacilities.push(facility);

        setChangedAccommodation(`removed facility ${e.target.value}`);
    }

    const disableOrEnable = async (id) => {
        const response = await disableOrEnableRoom(id);
        await setAlert([...alert, response]);
        return await response.type === "success";
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const capacity = formData.get("capacity");

        accommodation.capacity = capacity;
        accommodation.description = formData.get("description");
        accommodation.name = formData.get("name");
        accommodation.city = cities.find(city => city.id === parseInt(formData.get("city")));

        updateAccommodation(id, accommodation).then(accommodationResponse => {
            if (formData.get("file").type === "image/png" || formData.get("file").type === "image/jpeg") {
                const imageFormData = new FormData();
                imageFormData.append("file", formData.get("file"));
                addAccommodationImage(accommodation.id, imageFormData).then((response) => {
                    setAlert([...alert, response, accommodationResponse]);
                })
            } else {
                setAlert([...alert, accommodationResponse]);
            }
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="col-12 d-flex justify-content-between">
                <div className="form-floating mb-4 col-6 pe-2">
                    <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                           htmlFor="floatingInputValue">ID</label>
                    <input disabled type="text" name="id" className="form-control form-control-lg border-success"
                           required={true} defaultValue={accommodation?.id} style={{fontSize: "1.1em"}}/>
                </div>
                <div className="col-6 ps-2">
                    <FormInput defaultValue={accommodation?.name} content="NAME" type="text" name="name"/>
                </div>
            </div>
            <div className="col-12 d-flex justify-content-between">
                <div className="col-6 pe-2">
                    <FormInput defaultValue={accommodation?.capacity} content="CAPACITY" type="number" name="capacity"/>
                </div>
                <div className="ps-2 col-6 pb-4">
                    <select className="bg-success text-white col-12 h-100 rounded p-2" name="city">
                        {
                            cities && cities?.map(city => (
                                <option selected={city.id === accommodation?.city.id} value={city.id}>{city.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="d-flex justify-content-center mb-4 mx-auto">
                <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-12">
                    <img src={getAccommodationImage(accommodation?.id)} className="img-fluid col-12 mb-2"
                         alt=""
                         onError={(e) => e.target.src = "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png"}/>
                    <input className="btn btn-success col-12" type="file" name="file" accept=".png, .jpeg"
                           onChange={(e) => verifyFile(e, setAlert)}/>
                </div>
            </div>
            <textarea name="description" placeholder="Description..."
                      className="form-control form-control-lg border-success mb-4"
                      required={true} defaultValue={accommodation?.description}
                      style={{fontSize: "1.1em", resize: "none", height: "10em"}}/>
            <div className="col-12 row p-0 m-0 row-cols-xl-2 row-cols-lg-2 row-cols-md-2 row-cols-1">
                <div className="mb-xl-0 mb-lg-0 mb-md-0 mb-2">
                    <div className="col-12 border-success border rounded p-3">
                        <div className="d-flex justify-content-center">
                            <h3 className="text-center me-3">Rooms</h3>
                            <button type="button" onClick={() => navigate("room/add")}
                                    className="btn-success btn btn-sm m-1 h-25"><FaPlus/></button>
                        </div>
                        {
                            rooms && rooms?.map(room => (
                                <div className="bg-success rounded p-1 d-flex justify-content-between mt-1">
                                    <div className="ps-2">
                                        <h5 className="text-white mt-2">{room.type.name} Room {room.id}</h5>
                                    </div>
                                    <div className="d-xl-flex d-lg-flex d-block">
                                        <button type="button" onClick={() => navigate(`room/${room.id}`)}
                                                className="text-white fs-5 btn btn-sm mb-1"><FaEdit/></button>
                                        <CheckboxInput onChange={disableOrEnable} id={room.id} value={room.disabled} className="m-xl-auto m-lg-auto m-0"/>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="mt-xl-0 mt-lg-0 mt-md-0 mt-3">
                    <div className="col-12 border-success border rounded p-3">
                        <div
                            className="d-flex justify-content-center row row-cols-xl-4 row-cols-md-2 row-cols-lg-4 row-cols-sm-2">
                            <h3 className="text-center me-3">Facilities</h3>
                            {
                                addFacility
                                    ?
                                    <div className="dropdown">
                                        <button className="btn btn-success dropdown-toggle" type="button"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                            Choose facility
                                        </button>
                                        <ul className="dropdown-menu">
                                            {
                                                nonMatchingFacilities?.map(facility => (
                                                    <li>
                                                        <button type="button" onClick={addAccommodationFacility}
                                                                className="dropdown-item"
                                                                value={facility.id}>{facility.name}</button>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    : <button onClick={() => setAddFacility(true)} type="button"
                                              className="btn-success btn btn-sm m-1" style={{width: "2.5em"}}><FaPlus/>
                                    </button>
                            }
                        </div>
                        {
                            accommodation?.accommodation_facilities.map(f => (
                                <div className="bg-success rounded p-1 d-flex justify-content-between mt-1">
                                    <div className="ps-2">
                                        <h6 className="text-white m-1">{f.name}</h6>
                                    </div>
                                    <button type="button" value={f.id} onClick={removeAccommodationFacility}
                                            className="btn-close-white btn-close"></button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-success" type="submit">Save</button>
            </div>
            <Alert alertData={alert} alertCallBack={setAlert}/>
        </form>
    )
}

export default EditHotel;