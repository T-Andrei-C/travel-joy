import {useEffect, useState} from "react";
import {getAllRoomTypes, getRoomById, updateRoom} from "../../service/CRUDRooms";
import {useNavigate, useParams} from "react-router-dom";
import FormInput from "../FormInput";
import {FaEdit, FaPlus} from "react-icons/fa";
import {getRoomOffersByRoomId} from "../../service/CRUDTravelPackages";
import {getAllNonMatchingRoomFacilities} from "../../service/CRUDRoomFacilities";
import Alert from "../Alert";
import {MdPeopleAlt} from "react-icons/md";

const EditRoom = () => {

    const [room, setRoom] = useState(null);
    const [roomOffers, setRoomOffers] = useState(null);
    const [roomTypes, setRoomTypes] = useState(null);
    const [addFacility, setAddFacility] = useState(false);
    const [nonMatchingFacilities, setNonMatchingFacilities] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertColor, setAlertColor] = useState("");
    const [alertContent, setAlertContent] = useState("");
    const [changedAccommodation, setChangedAccommodation] = useState(null);
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

        setChangedAccommodation(`updated facilities with ${e.target.value}`);
    }

    const removeRoomFacility = (e) => {
        const facility = room.room_facilities.filter(f => f.id + "" === e.target.value)[0];

        room.room_facilities.splice(room.room_facilities.indexOf(facility), 1);
        nonMatchingFacilities.push(facility);

        setChangedAccommodation(`removed facility ${e.target.value}`);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const roomPrice = formData.get("price");

        if (roomPrice < 100){
            setAlertContent("Room price can't be lower than 100");
            setAlertColor("danger");
            setShowAlert(true);
        } else {
            room.type = {id: formData.get("type")};
            room.price = roomPrice;

            updateRoom(roomId, room).then(response => {
                setAlertContent(response.content);
                setAlertColor(response.type);
                setShowAlert(true);
            })
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="col-12 d-flex flex-wrap">
                <div className="form-floating mb-4 col-2 pe-2">
                    <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                           htmlFor="floatingInputValue">ID</label>
                    <input disabled type="text" name="id" className="form-control form-control-lg border-success"
                           required={true} defaultValue={room?.id} style={{fontSize: "1.1em"}}/>
                </div>
                <div className="ps-2 pe-2 col-5 pb-4">
                    <select className="bg-success text-white col-12 h-100 rounded p-2" name="type">
                        {
                            roomTypes && roomTypes.map(type => (
                                <option selected={room?.type.id === type.id} value={type.id}>{type.name} - {type.capacity}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-5 ps-2">
                    <FormInput defaultValue={room?.price} content="PRICE" type="number" name="price"/>
                </div>
            </div>
            <div className="col-12 row p-0 m-0 row-cols-xl-2 row-cols-lg-2 row-cols-md-2 row-cols-1">
                <div className="mb-xl-0 mb-lg-0 mb-md-0 mb-2">
                    <div className="col-12 border-success border rounded p-3">
                        <div className="d-flex justify-content-center">
                            <h3 className="text-center me-3">Room Offers</h3>
                            <button type="button" onClick={() => navigate(`offer/add`)} className="btn-success btn btn-sm m-1 h-25"><FaPlus/></button>
                        </div>
                        {
                            roomOffers && roomOffers.map(roomOffer => (
                                <div
                                    className={`bg-success ${!roomOffer.available && "bg-success-subtle"} rounded p-1 d-flex justify-content-between mt-1`}>
                                    <div className="ps-2">
                                        <h5 className="text-white mt-2">Room
                                            Offer {roomOffer.id} {roomOffer.date_from} -> {roomOffer.date_to}</h5>
                                    </div>
                                    <button disabled={!roomOffer.available} type="button"
                                            onClick={() => navigate(`offer/${roomOffer.id}`)}
                                            className="text-white fs-5 btn border-0 btn-sm mb-1">
                                        <FaEdit/> {!roomOffer.available && "BOUGHT"}</button>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="mt-xl-0 mt-lg-0 mt-md-0 mt-3">
                    <div className="col-12 border-success border rounded p-3">
                        <div
                            className="d-flex justify-content-center row row-cols-xl-4 row-cols-md-2 row-cols-lg-4 row-cols-sm-2">
                            <h3 className="text-center me-3">Facilities</h3>
                            {
                                addFacility
                                    ?
                                    <div className="dropdown">
                                        <button className="btn btn-success dropdown-toggle" type="button"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                            Choose facility
                                        </button>
                                        <ul className="dropdown-menu">
                                            {
                                                nonMatchingFacilities?.map(facility => (
                                                    <li>
                                                        <button type="button" onClick={addRoomFacility}
                                                                className="dropdown-item"
                                                                value={facility.id}>{facility.name}</button>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    : <button onClick={() => setAddFacility(true)} type="button"
                                              className="btn-success btn btn-sm m-1" style={{width: "2.5em"}}><FaPlus/>
                                    </button>
                            }
                        </div>
                        {
                            room?.room_facilities.map(f => (
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
                <button className="btn btn-success" type="submit">Save</button>
            </div>
            {
                showAlert && <Alert color={alertColor} content={alertContent} callBack={setShowAlert}/>
            }
        </form>
    )
}

export default EditRoom