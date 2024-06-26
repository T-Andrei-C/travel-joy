import FormInput from "../FormInput";
import Alert from "../Alert";
import {useEffect, useState} from "react";
import {getCities} from "../../service/CRUDCity";
import {getAllAccommodationFacilities} from "../../service/CRUDAccommodationFacilities";
import {addAccommodation, addAccommodationImage, getAccommodationImage} from "../../service/CRUDAccommodations";
import {useNavigate} from "react-router-dom";
import ImageCropper from "./ImageCropper";
import {handleAccommodationImage} from "../../service/ImageService";
import ViewAndChooseFacilities from "./ViewAndChooseFacilities";

const AddHotel = () => {

    const [cities, setCities] = useState(null);
    const [accommodationFacilities, setAccommodationFacilities] = useState(null);
    const [chosenFacilities, setChosenFacilities] = useState([]);
    const [alert, setAlert] = useState([]);
    const [addFacility, setAddFacility] = useState(false);
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [openCrop, setOpenCrop] = useState(false);
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

        if (accommodation.city.id === "Select a city") {
            setAlert([...alert, {
                content: "please select a city",
                type: "warning"
            }]);
            return;
        }

        if (file === null) {
            setAlert([...alert, {
                content: "photo missing for the accommodation",
                type: "danger"
            }]);
            return;
        }

        if (file.type === "image/png" || file.type === "image/jpeg") {
            addAccommodation(accommodation).then(accommodationResponse => {
                const imageFormData = new FormData();
                imageFormData.append("file", file);

                if (accommodationResponse.object !== null) {
                    addAccommodationImage(accommodationResponse.object.id, imageFormData).then(response => {
                        setAlert([...alert, response, accommodationResponse]);
                    })
                    setTimeout(() => {
                        navigate("/admin/hotels");
                    }, [5000])
                } else {
                    setAlert([...alert, accommodationResponse]);
                }
            })
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="col-12 d-flex justify-content-between">
                <div className="col-4 pe-2">
                    <FormInput content="NAME" type="text" name="name"/>
                </div>
                <div className="ps-2 col-4 pb-4 pe-2">
                    <select className="bg-success text-white col-12 h-100 rounded p-2" name="city">
                        <option selected hidden>Select a city</option>
                        {
                            cities && cities?.map(city => (
                                <option value={city.id}>{city.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="ps-2 col-4">
                    <FormInput content="CAPACITY" type="number" name="capacity"/>
                </div>
            </div>
            <div className="d-flex justify-content-center mb-4 mx-auto">
                <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-12">
                    {
                        imageUrl && <img src={imageUrl} className="img-fluid col-12 mb-2" alt=""/>
                    }
                    <input className="btn btn-success col-12"
                           style={{padding: "0.85em"}} type="file" accept=".png, .jpg"
                           onChange={(e) => handleAccommodationImage(e, setAlert, setFile, setImageUrl, setOpenCrop)}
                    />
                </div>
            </div>
            <textarea name="description" placeholder="Description..."
                      className="form-control form-control-lg border-success mb-4"
                      required={true}
                      style={{fontSize: "1.1em", resize: "none", height: "10em"}}/>
            <div className="d-flex justify-content-center">
                <div className="mt-xl-0 mt-lg-0 mt-md-0 mt-3 col-12 col-xl-8 col-lg-8 col-md-8">
                    <ViewAndChooseFacilities
                        facilities={chosenFacilities}
                        addFacility={addAccommodationFacility}
                        removeFacility={removeAccommodationFacility}
                        nonMatchingFacilities={accommodationFacilities}
                        addingFacility={addFacility}
                        setAddingFacility={setAddFacility}
                    />
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-success" type="submit">Add accommodation</button>
            </div>
            {
                openCrop &&
                <ImageCropper setOpenCrop={setOpenCrop} photoUrl={imageUrl} setFile={setFile}
                              setPhotoUrl={setImageUrl}/>
            }
            <Alert alertData={alert} alertCallBack={setAlert}/>
        </form>
    )
}

export default AddHotel;