import FormInput from "../FormInput";
import Alert from "../Alert";
import {useEffect, useState} from "react";
import {addRoom, addRoomImage, getAllRoomTypes} from "../../service/CRUDRooms";
import {getAllRoomFacilities} from "../../service/CRUDRoomFacilities";
import {useNavigate, useParams} from "react-router-dom";
import RoomImageCropper from "./RoomImageCropper";
import ViewAndAddRoomImages from "./ViewAndAddRoomImages";
import ViewAndChooseFacilities from "./ViewAndChooseFacilities";

const AddRoom = () => {

    const [roomTypes, setRoomTypes] = useState(null);
    const [roomFacilities, setRoomFacilities] = useState(null);
    const [chosenFacilities, setChosenFacilities] = useState([]);
    const [alert, setAlert] = useState([]);
    const [addFacility, setAddFacility] = useState(false);
    const [images, setImages] = useState([]);
    const [openCrop, setOpenCrop] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
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
                        }, [5000])
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
            <ViewAndAddRoomImages
                setImages={setImages}
                setAlert={setAlert}
                setOpenCrop={setOpenCrop}
                images={images}
                setCurrentImage={setCurrentImage}
                roomId={0}
            />
            <div className="d-flex justify-content-center">
                <div className="mt-xl-0 mt-lg-0 mt-md-0 mt-3 col-12 col-xl-8 col-lg-8 col-md-8">
                    <ViewAndChooseFacilities
                        facilities={chosenFacilities}
                        addFacility={addRoomFacility}
                        removeFacility={removeRoomFacility}
                        nonMatchingFacilities={roomFacilities}
                        addingFacility={addFacility}
                        setAddingFacility={setAddFacility}
                    />
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-success" type="submit">Add room</button>
            </div>
            {
                openCrop && <RoomImageCropper image={currentImage} setOpenCrop={setOpenCrop} setImages={setImages} images={images} setImage={setCurrentImage}/>
            }
            <Alert alertData={alert} alertCallBack={setAlert}/>
        </form>
    )
}

export default AddRoom;