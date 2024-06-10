import FormInput from "../FormInput";
import {IoIosSave} from "react-icons/io";
import {FaPlus} from "react-icons/fa";

const AddElementSwitch = ({isAdded, setIsAdded, onSubmit}) => {
    return (
        isAdded ?
            <form className="row col-12 me-auto ms-auto d-flex justify-content-center" onSubmit={onSubmit}>
                <div className="col-xl-5 col-lg-5 col-md-7 col-sm-8 col-9 p-0">
                    <FormInput content="NAME" type="text" name="name" className="rounded-end-0"/>
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
    )
}

export default AddElementSwitch;