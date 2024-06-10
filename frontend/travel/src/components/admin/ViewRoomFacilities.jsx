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

const ViewRoomFacilities = () => {
    const [facilities, setFacilities] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertColor, setAlertColor] = useState("");
    const [alertContent, setAlertContent] = useState("");

    useEffect(() => {
        getAllRoomFacilities().then(facilities => {
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

        updateRoomFacility(facility.id, facility).then(response => {
            setAlertContent(response.content);
            setAlertColor(response.type);
            setShowAlert(true);
        })
    }

    const deleteFacility = (id) => {
        deleteRoomFacility(id).then(response => {

            if (response.type === "success") {
                setIsDeleted(true);
            }

            setAlertContent(response.content);
            setAlertColor(response.type);
            setShowAlert(true);
        })
        setIsDeleted(false);
    }

    const addFacility = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const facility = {
            name: form.get("name")
        }
        addRoomFacility(facility).then(response => {
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
            <AddElementSwitch onSubmit={addFacility} setIsAdded={setIsAdded} isAdded={isAdded}/>
            <UpdateDeleteViewElement elements={facilities} deleteElement={deleteFacility} editElement={editFacility}/>
            {
                showAlert && <Alert color={alertColor} content={alertContent} callBack={setShowAlert}/>
            }
        </>
    )

}

export default ViewRoomFacilities;