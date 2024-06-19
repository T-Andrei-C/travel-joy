import {useEffect, useState} from "react";
import {addDiscount, deleteDiscount, getAllDiscounts, updateDiscount} from "../../service/CRUDDiscounts";
import FormInput from "../FormInput";
import {IoIosSave} from "react-icons/io";
import {FaPlus} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import Alert from "../Alert";
import {addRoomType, deleteRoomType, getAllRoomTypes, updateRoom, updateRoomType} from "../../service/CRUDRooms";

const ViewRoomTypes = () => {
    const [roomTypes, setRoomTypes] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [alert, setAlert] = useState([]);

    useEffect(() => {
        getAllRoomTypes().then(roomTypes => {
            setRoomTypes(roomTypes);
        })
    }, [isDeleted, isAdded])

    const editRoomType = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);

        const roomType = {
            id: parseInt(form.get("id")),
            name: form.get("name"),
            capacity: form.get("capacity")
        }

        updateRoomType(roomType.id, roomType).then(response => {
            setAlert([...alert, response])
        })
    }

    const removeRoomType = (id) => {
        deleteRoomType(id).then(response => {

            if (response.type === "success") {
                setIsDeleted(true);
            }

            setAlert([...alert, response])
        })
        setIsDeleted(false);
    }

    const insertRoomType = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const roomType = {
            name: form.get("name"),
            capacity: form.get("capacity")
        }
        addRoomType(roomType).then(response => {
            if (response.type === "success") {
                setIsAdded(false);
            }
            setAlert([...alert, response])
        })
    }

    return (
        <>
            {isAdded ?
                <form className="row col-12 me-auto ms-auto d-flex justify-content-center" onSubmit={insertRoomType}>
                    <div className="col-xl-4 col-5 p-0">
                        <FormInput content="NAME" type="text" name="name" className="rounded-end-0"/>
                    </div>
                    <div className="col-xl-4 col-5 p-0">
                        <FormInput content="CAPACITY" type="number" name="capacity" className="rounded-end-0 rounded-start-0"/>
                    </div>
                    <button
                        className="btn btn-success mb-4 col-xl-1 col-lg-1 col-md-1 col-2 fs-3 rounded-start-0"
                        type="submit"><IoIosSave className="mb-1"/></button>
                </form>
                :
                <div className="d-flex justify-content-center">
                    <button className="btn btn-success mb-3" onClick={() => setIsAdded(true)}><FaPlus
                        className="mb-1"/></button>
                </div>
            }
            <div className="row column-gap-0 row-cols-1 row-cols-xl-2 row-cols-lg-2 row-cols-md-2 ms-3">
                {
                    roomTypes && roomTypes.map(roomType => (
                        <form className="col-12 row me-auto" key={roomType.id} onSubmit={editRoomType}>
                            <div className="form-floating mb-2 col-2 p-0">
                                <label className="pt-1 text-white fw-bold" style={{fontSize: "0.75em"}}
                                       htmlFor="floatingInputValue">ID</label>
                                <input type="text" name="id"
                                       className="form-control form-control-lg bg-success text-white border-success rounded-end-0"
                                       required={true} value={roomType.id} style={{fontSize: "1.1em"}}/>
                            </div>
                            <div className="form-floating mb-2 col-xl-4 col-3 p-0">
                                <label className="pt-1 fw-bold text-success" style={{fontSize: "0.75em"}}
                                       htmlFor="floatingInputValue">NAME</label>
                                <input type="text" name="name"
                                       className="form-control form-control-lg border-success rounded-start-0 rounded-end-0"
                                       required={true} defaultValue={roomType.name} style={{fontSize: "1.1em"}}/>
                            </div>
                            <div className="form-floating mb-2 col-xl-4 col-3 p-0">
                                <label className="pt-1 fw-bold text-success" style={{fontSize: "0.75em"}}
                                       htmlFor="floatingInputValue">CAPACITY</label>
                                <input type="number" name="capacity"
                                       className="form-control form-control-lg border-success rounded-start-0 rounded-end-0"
                                       required={true} defaultValue={roomType.capacity} style={{fontSize: "1.1em"}}/>
                            </div>
                            <button className="btn btn-danger mb-2 col-xl-1 col-2 fs-3 rounded-start-0 rounded-end-0"
                                    type="button" onClick={() => removeRoomType(roomType.id)}><MdDelete className="mb-1"/>
                            </button>
                            <button className="btn btn-success mb-2 col-xl-1 col-2 fs-3 rounded-start-0" type="submit">
                                <IoIosSave className="mb-1"/></button>
                        </form>
                    ))
                }
            </div>
            <Alert alertData={alert} alertCallBack={setAlert}/>
        </>
    )
}

export default ViewRoomTypes;