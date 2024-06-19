import {useEffect, useState} from "react";
import AddElementSwitch from "./AddElementSwitch";
import UpdateDeleteViewElement from "./UpdateDeleteViewElement";
import Alert from "../Alert";
import {addCity, deleteCity, getCities, updateCity} from "../../service/CRUDCity";

const ViewCities = () => {
    const [cities, setCities] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [alert, setAlert] = useState([]);

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
            setAlert([...alert, response])
        })
    }

    const removeCity = (id) => {
        deleteCity(id).then(response => {

            if (response.type === "success") {
                setIsDeleted(true);
            }

            setAlert([...alert, response])
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
            setAlert([...alert, response])
        })
    }

    return (
        <>
            <AddElementSwitch onSubmit={insertCity} setIsAdded={setIsAdded} isAdded={isAdded}/>
            <UpdateDeleteViewElement elements={cities} deleteElement={removeCity} editElement={editCity}/>
            <Alert alertData={alert} alertCallBack={setAlert}/>
        </>
    )
}

export default ViewCities;