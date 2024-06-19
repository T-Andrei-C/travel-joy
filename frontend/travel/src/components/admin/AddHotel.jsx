import FormInput from "../FormInput";
import Alert from "../Alert";
import {useEffect, useState} from "react";
import {getCities} from "../../service/CRUDCity";
import {getAllAccommodationFacilities} from "../../service/CRUDAccommodationFacilities";
import {addAccommodation, addAccommodationImage} from "../../service/CRUDAccommodations";
import {verifyFile} from "../../service/ImageService";
import {useNavigate} from "react-router-dom";

const AddHotel = () => {

    const [cities, setCities] = useState(null);
    const [accommodationFacilities, setAccommodationFacilities] = useState(null);
    const [chosenFacilities, setChosenFacilities] = useState([]);
    const [alert, setAlert] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCities().then(cities => {
            setCities(cities);
        })
        getAllAccommodationFacilities().then(accommodationFacilities => {
            setAccommodationFacilities(accommodationFacilities);
        })
    }, [])

    const addAccommodationFacility = (e) => {
        const facility = accommodationFacilities.filter(f => f.id + "" === e.target.value)[0];
        setChosenFacilities([...chosenFacilities, facility]);
        accommodationFacilities.splice(accommodationFacilities.indexOf(facility), 1);
    }

    const removeAccommodationFacility = (e) => {
        const facility = chosenFacilities.filter(f => f.id + "" === e.target.value)[0];
        setChosenFacilities(current => current.splice(chosenFacilities.indexOf(facility), 1));
        accommodationFacilities.push(facility);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const accommodation = {
            name: formData.get("name"),
            description: formData.get("description"),
            capacity: formData.get("capacity"),
            city: {id: formData.get("city")},
            accommodation_facilities: chosenFacilities
        }

        if (accommodation.city.id === "Select a city"){
            setAlert([...alert, {
                content: "please select a city",
                type: "warning"
            }]);
            return;
        }

        if (formData.get("file").type === "image/png" || formData.get("file").type === "image/jpeg") {
            addAccommodation(accommodation).then(accommodationResponse => {
                const imageFormData = new FormData();
                imageFormData.append("file", formData.get("file"));
                if (accommodationResponse.object !== null){
                    addAccommodationImage(accommodationResponse.object.id, imageFormData).then(response => {
                        setAlert([...alert, response, accommodationResponse]);
                    })
                    setTimeout(() => {
                        navigate("/admin/hotels");
                    }, [2000])
                } else {
                    setAlert([...alert, accommodationResponse]);
                }
            })
        } else {
            setAlert([...alert, {
                content: "photo missing for the accommodation",
                type: "danger"
            }]);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="col-12 d-flex justify-content-between">
                <div className="col-6 pe-2">
                    <FormInput content="NAME" type="text" name="name"/>
                </div>
                <div className="ps-2 col-6 pb-4">
                    <select className="bg-success text-white col-12 h-100 rounded p-2" name="city">
                        <option selected hidden>Select a city</option>
                        {
                            cities && cities?.map(city => (
                                <option value={city.id}>{city.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="col-12 d-flex justify-content-between">
                <div className="col-6 pe-2">
                    <FormInput content="CAPACITY" type="number" name="capacity"/>
                </div>
                <div className="col-6 ps-2">
                <input className="btn btn-success col-12" style={{padding: "0.85em"}} type="file" name="file" accept=".png, .jpeg"
                       onChange={(e) => verifyFile(e, setAlert)}
                    />
                </div>
            </div>
            <textarea name="description" placeholder="Description..."
                      className="form-control form-control-lg border-success mb-4"
                      required={true}
                      style={{fontSize: "1.1em", resize: "none", height: "10em"}}/>
            <div className="d-flex justify-content-center">
                <div className="mt-xl-0 mt-lg-0 mt-md-0 mt-3 col-12 col-xl-8 col-lg-8 col-md-8">
                    <div className="col-12 border-success border rounded p-3">
                        <div
                            className="d-flex justify-content-center row row-cols-xl-4 row-cols-md-2 row-cols-lg-4 row-cols-sm-2">
                            <h3 className="text-center me-3">Facilities</h3>
                            <div className="dropdown">
                                <button className="btn btn-success dropdown-toggle" type="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                    Choose facility
                                </button>
                                <ul className="dropdown-menu">
                                    {
                                        accommodationFacilities?.map(facility => (
                                            <li>
                                                <button type="button" onClick={addAccommodationFacility}
                                                        className="dropdown-item"
                                                        value={facility.id}>{facility.name}</button>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        {
                            chosenFacilities.map(f => (
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
                <button className="btn btn-success" type="submit">Add accommodation</button>
            </div>
            <Alert alertData={alert} alertCallBack={setAlert}/>
        </form>
    )
}

export default AddHotel;