import FormInput from "../FormInput";
import {FaEdit, FaPlus} from "react-icons/fa";
import Alert from "../Alert";
import {useEffect, useState} from "react";
import {addRoom, addRoomImage, getAllRoomTypes, updateRoom} from "../../service/CRUDRooms";
import {getAllRoomFacilities} from "../../service/CRUDRoomFacilities";
import {useNavigate, useParams} from "react-router-dom";
import {retrieveRoomImageFiles, verifyFile} from "../../service/ImageService";

const AddRoom = () => {

    const [roomTypes, setRoomTypes] = useState(null);
    const [roomFacilities, setRoomFacilities] = useState(null);
    const [chosenFacilities, setChosenFacilities] = useState([]);
    const [alert, setAlert] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

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

        if (roomPrice < 100) {
            setAlert([...alert, {
                content: "Room price can't be lower than 100",
                type: "warning"
            }]);
        } else {
            const room = {
                type: {id: formData.get("type")},
                price: roomPrice,
                room_facilities: chosenFacilities
            }
            const images = retrieveRoomImageFiles(formData);

            if (room.type.id === "Select a room type"){
                setAlert([...alert, {
                    content: "please select a room type",
                    type: "warning"
                }]);
                return;
            }

            if (images.length < 1){
                setAlert([...alert, {
                    content: "please add at least one image",
                    type: "warning"
                }]);
                return;
            }

            addRoom(room, id).then(roomResponse => {
                images.map((image, index) => {
                    const imageFormData = new FormData();
                    imageFormData.append("file", images[index].file);
                    if (roomResponse.object !== null) {
                        addRoomImage(roomResponse.object.id, images[index].index, imageFormData).then(response => {
                            setAlert([...alert, response, roomResponse])
                        })
                        setTimeout(() => {
                            navigate(`/admin/hotels/${id}`);
                        }, [2000])
                    } else {
                        setAlert([...alert, roomResponse])
                    }
                })
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
            <div className="row row-cols-xl-3 row-cols-lg-3 row-cols-md-2 row-cols-1 mb-4 mx-auto">
                {
                    Array.from(Array(6).keys()).map((i) => (
                        <div className="my-2">
                            <input className="btn btn-success col-12" type="file" name={`file-${i}`}
                                   accept=".png, .jpeg"
                                   onChange={(e) => verifyFile(e, setAlert)}/>
                        </div>
                    ))
                }
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
            <Alert alertData={alert} alertCallBack={setAlert}/>
        </form>
    )
}

export default AddRoom;