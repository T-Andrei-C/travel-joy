import FormInput from "../FormInput";
import {FaEdit, FaPlus} from "react-icons/fa";
import Alert from "../Alert";
import {useEffect, useState} from "react";
import {addRoom, getAllRoomTypes, updateRoom} from "../../service/CRUDRooms";
import {getAllRoomFacilities} from "../../service/CRUDRoomFacilities";
import {useParams} from "react-router-dom";

const AddRoom = () => {

    const [roomTypes, setRoomTypes] = useState(null);
    const [roomFacilities, setRoomFacilities] = useState(null);
    const [chosenFacilities, setChosenFacilities] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertColor, setAlertColor] = useState("");
    const [alertContent, setAlertContent] = useState("");
    const {id} = useParams();

    useEffect(() => {
        getAllRoomTypes().then(roomTypes => {
            setRoomTypes(roomTypes);
        })
        getAllRoomFacilities().then(roomFacilities => {
            setRoomFacilities(roomFacilities);
        })
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const roomPrice = formData.get("price");

        if (roomPrice < 100){
            setAlertContent("Room price can't be lower than 100");
            setAlertColor("danger");
            setShowAlert(true);
        } else {
            const room = {
                type: {id: formData.get("type")},
                price: roomPrice,
                room_facilities: chosenFacilities
            }

            addRoom(room, id).then(response => {
                setAlertContent(response.content);
                setAlertColor(response.type);
                setShowAlert(true);
            })
        }
    }

    const addRoomFacility = (e) => {
        const facility = roomFacilities.filter(f => f.id + "" === e.target.value)[0];
        setChosenFacilities([...chosenFacilities, facility]);
        roomFacilities.splice(roomFacilities.indexOf(facility), 1);
    }

    const removeRoomFacility = (e) => {
        const facility = chosenFacilities.filter(f => f.id + "" === e.target.value)[0];
        setChosenFacilities(current => current.splice(chosenFacilities.indexOf(facility), 1));
        roomFacilities.push(facility);
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="col-12 d-flex flex-wrap">
                <div className="ps-2 pe-2 col-6 pb-4">
                    <select className="bg-success text-white col-12 h-100 rounded p-2" name="type">
                        <option hidden selected>Select a room type</option>
                        {
                            roomTypes && roomTypes.map(type => (
                                <option value={type.id}>{type.name} - {type.capacity}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-6 ps-2">
                    <FormInput content="PRICE" type="number" name="price"/>
                </div>
            </div>
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
                                        roomFacilities?.map(facility => (
                                            <li>
                                                <button type="button" onClick={addRoomFacility}
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
                                    <button type="button" value={f.id} onClick={removeRoomFacility}
                                            className="btn-close-white btn-close"></button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-success" type="submit">Add room</button>
            </div>
            {
                showAlert && <Alert color={alertColor} content={alertContent} callBack={setShowAlert}/>
            }
        </form>
    )
}

export default AddRoom;