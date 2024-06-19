import {useEffect, useState} from "react";
import {
    checkIfRoomOfferAvailable,
    getAllRoomOfferTypes,
    getRoomOfferById,
    updateRoomOffer
} from "../../service/CRUDTravelPackages";
import {useNavigate, useParams} from "react-router-dom";
import {getAllDiscounts} from "../../service/CRUDDiscounts";
import Alert from "../Alert";

const EditRoomOffer = () => {

    const [roomOffer, setRoomOffer] = useState(null);
    const [roomOfferTypes, setRoomOfferTypes] = useState(null);
    const [discounts, setDiscounts] = useState(null);
    const [alert, setAlert] = useState([]);
    const {id, roomId, offerId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        checkIfRoomOfferAvailable(offerId).then(available => {
            if (!available){
                navigate(`/admin/hotels/${id}/room/${roomId}`)
            }
        })
        getRoomOfferById(offerId).then(offer => {
            setRoomOffer(offer);
        })
        getAllDiscounts().then(discounts => {
            setDiscounts(discounts);
        })
        getAllRoomOfferTypes().then(roomOfferTypes => {
            setRoomOfferTypes(roomOfferTypes);
        })
    }, [])

    const getDate = (extraDays, extraYear) => {
        const date = new Date;
        date.setFullYear(date.getFullYear() + extraYear);
        date.setDate(date.getDate() + extraDays)

        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

        return `${year}-${month}-${day}`
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const date_from = new Date(formData.get("date_from"));
        const date_to = new Date(formData.get("date_to"));
         if (date_from > date_to){
             setAlert([...alert, {
                 content: "Date from can't be bigger than date to",
                 type: "warning"
             }])
         } else {
             checkIfRoomOfferAvailable(offerId).then(available => {
                 if (available){
                    const updatedRoomOffer = {
                        id: offerId,
                        type: {id: formData.get("type")},
                        discount: {id: formData.get("discount")},
                        dateFrom: formData.get("date_from"),
                        dateTo: formData.get("date_to"),
                    }

                    updateRoomOffer(offerId, updatedRoomOffer).then((response) => {
                        setAlert([...alert, response])
                    })
                 } else {
                     setAlert([...alert, {
                         content: "Room offer has been bought and can't be modified",
                         type: "warning"
                     }])
                 }
             })
         }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="col-12 d-flex justify-content-between">
                <div className="form-floating mb-4 col-2 pe-2">
                    <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                           htmlFor="floatingInputValue">ID</label>
                    <input disabled type="text" name="id" className="form-control form-control-lg border-success"
                           required={true} defaultValue={roomOffer?.id} style={{fontSize: "1.1em"}}/>
                </div>
                <div className="ps-2 pe-2 col-5 pb-4">
                    <select className="bg-success text-white col-12 h-100 rounded p-2" name="type">
                        {
                            roomOfferTypes && roomOfferTypes.map(type => (
                                <option selected={roomOffer?.type.id === type.id} value={type.id}>{type.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="ps-2 col-5 pb-4">
                    <select className="bg-success text-white col-12 h-100 rounded p-2" name="discount">
                        {
                            discounts && discounts?.map(discount => (
                                <option selected={discount.id === roomOffer?.discount.id}
                                        value={discount.id}>Discount {discount.value}%</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="col-12 d-flex justify-content-between">
                <div className="form-floating col-6 pe-3">
                    <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                           htmlFor="floatingInputValue">DATE-FROM</label>
                    <input id="startDate" name="date_from" min={getDate(0, 0)}
                           max={getDate(30, 0)}
                           className="fw-medium w-100 pt-4 ps-2 pe-2 rounded"
                           style={{height: "58px", border: "1px solid #198754"}} required={true} type="date"
                           defaultValue={roomOffer?.date_from} onChange={(e) => roomOffer.date_from = e.target.value}/>
                </div>
                <div className="form-floating col-6">
                    <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                           htmlFor="floatingInputValue">DATE-TO</label>
                    <input id="startDate" name="date_to"
                           min={getDate(1, 0)}
                           max={getDate(31, 0)} className="fw-medium w-100 pt-4 ps-2 pe-2 rounded"
                           style={{height: "58px", border: "1px solid #198754"}} required={true} type="date"
                           defaultValue={roomOffer?.date_to} onChange={(e) => roomOffer.date_to = e.target.value}/>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-success" type="submit">Save</button>
            </div>
            <Alert alertData={alert} alertCallBack={setAlert}/>
        </form>
    )
}

export default EditRoomOffer;