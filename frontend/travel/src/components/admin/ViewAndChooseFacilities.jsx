import {FaPlus} from "react-icons/fa";

const ViewAndChooseFacilities = ({facilities, nonMatchingFacilities, addFacility, removeFacility, addingFacility, setAddingFacility}) => {
    return (
        <div className="col-12 border-success border rounded p-3">
            <div
                className="d-flex justify-content-center row row-cols-xl-4 row-cols-md-2 row-cols-lg-4 row-cols-sm-2">
                <h3 className="text-center me-3">Facilities</h3>
                {
                    addingFacility
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
                                            <button type="button" onClick={addFacility}
                                                    className="dropdown-item"
                                                    value={facility.id}>{facility.name}</button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        : <button onClick={() => setAddingFacility(true)} type="button"
                                  className="btn-success btn btn-sm m-1" style={{width: "2.5em"}}><FaPlus/>
                        </button>
                }
            </div>
            {
                facilities?.map(f => (
                    <div className="bg-success rounded p-1 d-flex justify-content-between mt-1">
                        <div className="ps-2">
                            <h6 className="text-white m-1">{f.name}</h6>
                        </div>
                        <button type="button" value={f.id} onClick={removeFacility}
                                className="btn-close-white btn-close"></button>
                    </div>
                ))
            }
        </div>
    )
}

export default ViewAndChooseFacilities;