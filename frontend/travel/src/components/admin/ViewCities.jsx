import {useEffect, useState} from "react";
import {
    addRoomFacility,
    deleteRoomFacility,
    getAllRoomFacilities,
    updateRoomFacility
} from "../../service/CRUDRoomFacilities";
import AddElementSwitch from "./AddElementSwitch";
import UpdateDeleteViewElement from "./UpdateDeleteViewElement";
import Alert from "../Alert";
import {addCity, deleteCity, getCities, updateCity} from "../../service/CRUDCity";

const ViewCities = () => {
    const [cities, setCities] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertColor, setAlertColor] = useState("");
    const [alertContent, setAlertContent] = useState("");

    useEffect(() => {
        getCities().then(cities => {
            setCities(cities);
        })
    }, [isDeleted, isAdded])

    const editCity = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);

        const city = {
            id: parseInt(form.get("id")),
            name: form.get("name")
        }

        updateCity(city.id, city).then(response => {
            setAlertContent(response.content);
            setAlertColor(response.type);
            setShowAlert(true);
        })
    }

    const removeCity = (id) => {
        deleteCity(id).then(response => {

            if (response.type === "success") {
                setIsDeleted(true);
            }

            setAlertContent(response.content);
            setAlertColor(response.type);
            setShowAlert(true);
        })
        setIsDeleted(false);
    }

    const insertCity = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const city = {
            name: form.get("name")
        }
        addCity(city).then(response => {
            if (response.type === "success"){
                setIsAdded(false);
            }
            setAlertContent(response.content);
            setAlertColor(response.type);
            setShowAlert(true);
        })
    }

    return (
        <>
            <AddElementSwitch onSubmit={insertCity} setIsAdded={setIsAdded} isAdded={isAdded}/>
            <UpdateDeleteViewElement elements={cities} deleteElement={removeCity} editElement={editCity}/>
            {
                showAlert && <Alert color={alertColor} content={alertContent} callBack={setShowAlert}/>
            }
        </>
    )
}

export default ViewCities;