import {useEffect, useState} from "react";
import Alert from "../Alert";
import {addDiscount, deleteDiscount, getAllDiscounts, updateDiscount} from "../../service/CRUDDiscounts";
import {MdDelete} from "react-icons/md";
import {IoIosSave} from "react-icons/io";
import FormInput from "../FormInput";
import {FaPlus} from "react-icons/fa";

const ViewDiscounts = () => {
    const [discounts, setDiscounts] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [alert, setAlert] = useState([]);

    useEffect(() => {
        getAllDiscounts().then(discounts => {
            setDiscounts(discounts);
        })
    }, [isDeleted, isAdded])

    const editDiscount = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);

        const discount = {
            id: parseInt(form.get("id")),
            value: form.get("value")
        }

        updateDiscount(discount.id, discount).then(response => {
            setAlert([...alert, response])
        })
    }

    const removeDiscount = (id) => {
        deleteDiscount(id).then(response => {

            if (response.type === "success") {
                setIsDeleted(true);
            }

            setAlert([...alert, response])
        })
        setIsDeleted(false);
    }

    const insertDiscount = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const discount = {
            value: form.get("value")
        }
        addDiscount(discount).then(response => {
            if (response.type === "success") {
                setIsAdded(false);
            }
            setAlert([...alert, response])
        })
    }

    return (
        <>
            {isAdded ?
                <form className="row col-12 me-auto ms-auto d-flex justify-content-center" onSubmit={insertDiscount}>
                    <div className="col-xl-5 col-lg-5 col-md-7 col-sm-8 col-9 p-0">
                        <FormInput content="VALUE" type="number" name="value" className="rounded-end-0"/>
                    </div>
                    <button
                        className="btn btn-success mb-4 col-xl-1 col-lg-1 col-md-1 col-sm-2 col-3 fs-3 rounded-start-0"
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
                    discounts && discounts.map(discount => (
                        <form className="col-12 row me-auto" key={discount.id} onSubmit={editDiscount}>
                            <div className="form-floating mb-2 col-2 p-0">
                                <label className="pt-1 text-white fw-bold" style={{fontSize: "0.75em"}}
                                       htmlFor="floatingInputValue">ID</label>
                                <input type="text" name="id"
                                       className="form-control form-control-lg bg-success text-white border-success rounded-end-0"
                                       required={true} value={discount.id} style={{fontSize: "1.1em"}}/>
                            </div>
                            <div className="form-floating mb-2 col-xl-8 col-6 p-0">
                                <label className="pt-1 fw-bold text-success" style={{fontSize: "0.75em"}}
                                       htmlFor="floatingInputValue">VALUE</label>
                                <input type="number" name="value"
                                       className="form-control form-control-lg border-success rounded-start-0 rounded-end-0"
                                       required={true} defaultValue={discount.value} style={{fontSize: "1.1em"}}/>
                            </div>
                            <button className="btn btn-danger mb-2 col-xl-1 col-2 fs-3 rounded-start-0 rounded-end-0"
                                    type="button" onClick={() => removeDiscount(discount.id)}><MdDelete className="mb-1"/>
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

export default ViewDiscounts;