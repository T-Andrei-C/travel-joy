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
import {
    addRoomOfferType,
    deleteRoomOfferType,
    getAllRoomOfferTypes,
    updateRoomOfferType,
    updateRoomOfferTypes
} from "../../service/CRUDTravelPackages";

const ViewRoomOfferTypes = () => {
    const [roomOfferTypes, setRoomOfferTypes] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertColor, setAlertColor] = useState("");
    const [alertContent, setAlertContent] = useState("");

    useEffect(() => {
        getAllRoomOfferTypes().then(roomOfferTypes => {
            setRoomOfferTypes(roomOfferTypes);
        })
    }, [isDeleted, isAdded])

    const editRoomOfferTypes = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);

        const roomOfferType = {
            id: parseInt(form.get("id")),
            name: form.get("name")
        }

        updateRoomOfferType(roomOfferType.id, roomOfferType).then(response => {
            setAlertContent(response.content);
            setAlertColor(response.type);
            setShowAlert(true);
        })
    }

    const deleteRoomOfferTypes = (id) => {
        deleteRoomOfferType(id).then(response => {

            if (response.type === "success") {
                setIsDeleted(true);
            }

            setAlertContent(response.content);
            setAlertColor(response.type);
            setShowAlert(true);
        })
        setIsDeleted(false);
    }

    const addRoomOfferTypes = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const roomOfferType = {
            name: form.get("name")
        }
        addRoomOfferType(roomOfferType).then(response => {
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
            <AddElementSwitch onSubmit={addRoomOfferTypes} setIsAdded={setIsAdded} isAdded={isAdded}/>
            <UpdateDeleteViewElement elements={roomOfferTypes} deleteElement={deleteRoomOfferTypes} editElement={editRoomOfferTypes}/>
            {
                showAlert && <Alert color={alertColor} content={alertContent} callBack={setShowAlert}/>
            }
        </>
    )
}

export default ViewRoomOfferTypes;