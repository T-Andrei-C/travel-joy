import Alert from "../Alert";
import {useEffect, useState} from "react";
import {getAllDiscounts} from "../../service/CRUDDiscounts";
import {
    addRoomOffer,
    getAllRoomOfferTypes,
} from "../../service/CRUDTravelPackages";
import {useParams} from "react-router-dom";

const AddRoomOffer = () => {

    const [roomOfferTypes, setRoomOfferTypes] = useState(null);
    const [discounts, setDiscounts] = useState(null);
    const [alert, setAlert] = useState([]);
    const {roomId} = useParams();

    useEffect(() => {
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
        if (date_from > date_to) {
            setAlert([...alert, {
                content: "Date from can't be bigger than date to",
                type: "warning"
            }])
        } else {
            const roomOffer = {
                type: {id: formData.get("type")},
                discount: {id: formData.get("discount")},
                dateFrom: formData.get("date_from"),
                dateTo: formData.get("date_to"),
            }

            if (roomOffer.type.id === "Select a package"){
                setAlert([...alert, {
                    content: "please select a package",
                    type: "warning"
                }])
                return;
            } else if (roomOffer.discount.id === "Select a discount"){
                setAlert([...alert, {
                    content: "please select a discount",
                    type: "warning"
                }])
                return;
            }

            addRoomOffer(roomOffer, roomId).then((response) => {
                setAlert([...alert, response])
            })
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="col-12 d-flex justify-content-between mb-3">
                <div className="col-6 pe-3">
                    <select className="bg-success text-white col-12 h-100 rounded p-2" name="type">
                        <option selected hidden>Select a package</option>
                        {
                            roomOfferTypes && roomOfferTypes.map(type => (
                                <option value={type.id}>{type.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-6">
                    <select className="bg-success text-white col-12 h-100 rounded p-2" name="discount">
                        <option selected hidden>Select a discount</option>
                        {
                            discounts && discounts?.map(discount => (
                                <option value={discount.id}>Discount {discount.value}%</option>
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
                    />
                </div>
                <div className="form-floating col-6">
                    <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                           htmlFor="floatingInputValue">DATE-TO</label>
                    <input id="startDate" name="date_to"
                           min={getDate(1, 0)}
                           max={getDate(31, 0)} className="fw-medium w-100 pt-4 ps-2 pe-2 rounded"
                           style={{height: "58px", border: "1px solid #198754"}} required={true} type="date"
                    />
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-success" type="submit">Add offer</button>
            </div>
            <Alert alertData={alert} alertCallBack={setAlert}/>
        </form>
    )
}

export default AddRoomOffer;