import {MdDelete} from "react-icons/md";
import {IoIosSave} from "react-icons/io";

const UpdateDeleteViewElement = ({elements, editElement, deleteElement}) => {
    return (
        <div className="row column-gap-0 row-cols-1 row-cols-xl-2 row-cols-lg-2 row-cols-md-2 ms-3">
            {
                elements && elements.map(element => (
                    <form className="col-12 row me-auto" key={element.id} onSubmit={editElement}>
                        <div className="form-floating mb-2 col-2 p-0">
                            <label className="pt-1 text-white fw-bold" style={{fontSize: "0.75em"}}
                                   htmlFor="floatingInputValue">ID</label>
                            <input type="text" name="id"
                                   className="form-control form-control-lg bg-success text-white border-success rounded-end-0"
                                   required={true} value={element.id} style={{fontSize: "1.1em"}}/>
                        </div>
                        <div className="form-floating mb-2 col-xl-8 col-6 p-0">
                            <label className="pt-1 fw-bold text-success" style={{fontSize: "0.75em"}}
                                   htmlFor="floatingInputValue">NAME</label>
                            <input type="text" name="name"
                                   className="form-control form-control-lg border-success rounded-start-0 rounded-end-0"
                                   required={true} defaultValue={element.name} style={{fontSize: "1.1em"}}/>
                        </div>
                        <button className="btn btn-danger mb-2 col-xl-1 col-2 fs-3 rounded-start-0 rounded-end-0"
                                type="button" onClick={() => deleteElement(element.id)}><MdDelete className="mb-1"/>
                        </button>
                        <button className="btn btn-success mb-2 col-xl-1 col-2 fs-3 rounded-start-0" type="submit">
                            <IoIosSave className="mb-1"/></button>
                    </form>
                ))
            }
        </div>
    )
}

export default UpdateDeleteViewElement;