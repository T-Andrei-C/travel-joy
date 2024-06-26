import {useEffect, useState} from "react";
import {addRoomImage, getAllRoomTypes, getRoomById, updateRoom} from "../../service/CRUDRooms";
import {useNavigate, useParams} from "react-router-dom";
import FormInput from "../FormInput";
import {FaPlus} from "react-icons/fa";
import {deleteRoomOffer, getRoomOffersByRoomId} from "../../service/CRUDTravelPackages";
import {getAllNonMatchingRoomFacilities} from "../../service/CRUDRoomFacilities";
import Alert from "../Alert";
import {MdDelete} from "react-icons/md";
import ViewAndAddRoomImages from "./ViewAndAddRoomImages";
import RoomImageCropper from "./RoomImageCropper";
import ViewAndChooseFacilities from "./ViewAndChooseFacilities";

const EditRoom = () => {

    const [room, setRoom] = useState(null);
    const [roomOffers, setRoomOffers] = useState(null);
    const [roomTypes, setRoomTypes] = useState(null);
    const [addFacility, setAddFacility] = useState(false);
    const [nonMatchingFacilities, setNonMatchingFacilities] = useState(null);
    const [alert, setAlert] = useState([]);
    const [images, setImages] = useState([]);
    const [openCrop, setOpenCrop] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [changedRoom, setChangedRoom] = useState(null);
    const {roomId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getRoomById(roomId).then(room => {
            setRoom(room);
        })
        getRoomOffersByRoomId(roomId).then(roomOffers => {
            setRoomOffers(roomOffers);
        })
        getAllNonMatchingRoomFacilities(roomId).then(facilities => {
            setNonMatchingFacilities(facilities);
        })
        getAllRoomTypes().then(roomTypes => {
            setRoomTypes(roomTypes);
        })
    }, [])

    const addRoomFacility = (e) => {
        const facility = nonMatchingFacilities.filter(f => f.id + "" === e.target.value)[0];

        room.room_facilities.push(facility);
        nonMatchingFacilities.splice(nonMatchingFacilities.indexOf(facility), 1);

        setChangedRoom(`updated facilities with ${e.target.value}`);
    }

    const removeRoomFacility = (e) => {
        const facility = room.room_facilities.filter(f => f.id + "" === e.target.value)[0];

        room.room_facilities.splice(room.room_facilities.indexOf(facility), 1);
        nonMatchingFacilities.push(facility);

        setChangedRoom(`removed facility ${e.target.value}`);
    }

    const removeRoomOffer = (offerId, i) => {
        deleteRoomOffer(offerId).then().then(response => {
            setAlert([...alert, response]);
        })
        const offers = roomOffers;
        offers.splice(i, 1);
        setRoomOffers(offers);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const roomPrice = formData.get("price");

        if (roomPrice < 100) {
            setAlert([...alert, {
                content: "Room price can't be lower than 100",
                type: "warning"
            }])
        } else {
            room.type = {id: formData.get("type")};
            room.price = roomPrice;

            updateRoom(roomId, room).then(response => {
                images.map((image, index) => {
                    const imageFormData = new FormData();
                    imageFormData.append("file", images[index].file);
                    addRoomImage(room.id, images[index].index, imageFormData);
                })
                setAlert([...alert, response])
            })
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="col-12 d-flex flex-wrap">
                <div className="col-2 pe-2">
                    <FormInput defaultValue={room?.id} type="text" name="id" content="ID" disabled={true}/>
                </div>
                <div className="ps-2 pe-2 col-5 pb-4">
                    <select className="bg-success text-white col-12 h-100 rounded p-2" name="type">
                        {
                            roomTypes && roomTypes.map(type => (
                                <option selected={room?.type.id === type.id}
                                        value={type.id}>{type.name} - {type.capacity}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-5 ps-2">
                    <FormInput defaultValue={room?.price} content="PRICE" type="number" name="price"/>
                </div>
            </div>
            <ViewAndAddRoomImages
                setImages={setImages}
                setAlert={setAlert}
                setOpenCrop={setOpenCrop}
                images={images}
                setCurrentImage={setCurrentImage}
                roomId={roomId}
            />
            <div className="col-12 row p-0 m-0 row-cols-xl-2 row-cols-lg-2 row-cols-md-2 row-cols-1">
                <div className="mb-xl-0 mb-lg-0 mb-md-0 mb-2">
                    <div className="col-12 border-success border rounded p-3">
                        <div className="d-flex justify-content-center">
                            <h3 className="text-center me-3">Room Offers</h3>
                            <button type="button" onClick={() => navigate(`offer/add`)}
                                    className="btn-success btn btn-sm m-1 h-25"><FaPlus/></button>
                        </div>
                        {
                            roomOffers && roomOffers?.map((roomOffer, i) => (
                                <div
                                    className={`bg-success ${!roomOffer.available && "bg-success-subtle"} rounded p-1 d-flex justify-content-between mt-1`}>
                                    <div className="ps-2">
                                        <h5 className="text-white mt-2">Room
                                            Offer {roomOffer.id} | {roomOffer.date_from} -> {roomOffer.date_to} | {roomOffer.discount.value}% off</h5>
                                    </div>
                                    <button disabled={!roomOffer.available} type="button"
                                            onClick={() => removeRoomOffer(roomOffer.id, i)}
                                            className="text-white btn border-0 btn-sm mb-1">
                                        <MdDelete className="fs-3 pt-1"/> {!roomOffer.available && "BOUGHT"}</button>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="mt-xl-0 mt-lg-0 mt-md-0 mt-3">
                    <ViewAndChooseFacilities
                        facilities={room?.room_facilities}
                        addFacility={addRoomFacility}
                        removeFacility={removeRoomFacility}
                        nonMatchingFacilities={nonMatchingFacilities}
                        addingFacility={addFacility}
                        setAddingFacility={setAddFacility}
                    />
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-success" type="submit">Save</button>
            </div>
            {
                openCrop && <RoomImageCropper image={currentImage} setOpenCrop={setOpenCrop} setImages={setImages} images={images} setImage={setCurrentImage}/>
            }
            <Alert alertData={alert} alertCallBack={setAlert}/>
        </form>
    )
}

export default EditRoom