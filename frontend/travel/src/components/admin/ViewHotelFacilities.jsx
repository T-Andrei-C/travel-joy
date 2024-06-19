import {useEffect, useState} from "react";
import {
    addAccommodationFacility,
    deleteAccommodationFacility,
    getAllAccommodationFacilities,
    updateAccommodationFacility
} from "../../service/CRUDAccommodationFacilities";
import Alert from "../Alert";
import AddElementSwitch from "./AddElementSwitch";
import UpdateDeleteViewElement from "./UpdateDeleteViewElement";

const ViewHotelFacilities = () => {

    const [facilities, setFacilities] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [alert, setAlert] = useState([]);

    useEffect(() => {
        getAllAccommodationFacilities().then(facilities => {
            setFacilities(facilities);
        })
    }, [isDeleted, isAdded])

    const editFacility = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);

        const facility = {
            id: parseInt(form.get("id")),
            name: form.get("name")
        }

        updateAccommodationFacility(facility.id, facility).then(response => {
            setAlert([...alert, response])
        })
    }

    const deleteFacility = (id) => {
        deleteAccommodationFacility(id).then(response => {

            if (response.type === "success") {
                setIsDeleted(true);
            }

            setAlert([...alert, response])
        })
        setIsDeleted(false);
    }

    const addFacility = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const facility = {
            name: form.get("name")
        }
        addAccommodationFacility(facility).then(response => {
            if (response.type === "success"){
                setIsAdded(false);
            }
            setAlert([...alert, response])
        })
    }

    return (
        <>
            <AddElementSwitch onSubmit={addFacility} setIsAdded={setIsAdded} isAdded={isAdded}/>
            <UpdateDeleteViewElement elements={facilities} deleteElement={deleteFacility} editElement={editFacility}/>
            <Alert alertData={alert} alertCallBack={setAlert}/>
        </>
    )
}

export default ViewHotelFacilities;