import {useEffect, useState} from "react";
import {getAccommodationImage, getAllAccommodations} from "../../service/CRUDAccommodations";
import {useNavigate} from "react-router-dom";
import {FaEdit, FaPlus} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";
import {MdBed, MdBedroomParent} from "react-icons/md";
import {GoDotFill} from "react-icons/go";
import {BsDot} from "react-icons/bs";

const ViewHotels = () => {
    const [accommodations, setAccommodations] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAllAccommodations().then(accommodations => {
            setAccommodations(accommodations);
        })
    }, [])

    return (
        <div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-success mb-3" onClick={() => navigate("add")}><FaPlus
                    className="mb-1"/></button>
            </div>
            <div className="row row-cols-xl-3 row-cols-lg-3 row-cols-md-2">
                {
                    accommodations && accommodations.map(accommodation => (
                        <div className="card text-bg-dark bg-transparent border-0 mb-4">
                            <div className="bg-black rounded">
                                <img src={getAccommodationImage(accommodation.id)} className="card-img img-fluid h-100 opacity-50"
                                     onError={(e) => e.target.src = "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png"}
                                     alt="..."/>
                            </div>
                            <div className="card-img-overlay p-0 ms-3 me-3">
                                <div className="d-flex justify-content-between">
                                    <h4 className="card-title mb-0">{accommodation.name}</h4>
                                    <button onClick={() => navigate(`${accommodation.id}`)}
                                            className="card-title bg-transparent border-0 mb-0"><FaEdit className="fs-4"/>
                                    </button>
                                </div>
                                <p className="card-text pt-0"><FaLocationDot className="mb-1"/> {accommodation.city.name}
                                    <BsDot/> {accommodation.capacity} <MdBed/></p>
                                <p className="card-text">{accommodation.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/*<table className="table-success table-bordered table-responsive table-striped table">*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th>*/}
            {/*            <button type="button" onClick={() => navigate("add")}*/}
            {/*                    className="btn-success btn btn-sm m-1 h-25"><FaPlus/></button>*/}
            {/*        </th>*/}
            {/*        <th>Id</th>*/}
            {/*        <th>Name</th>*/}
            {/*        <th>Capacity</th>*/}
            {/*        <th>City</th>*/}
            {/*        <th>Description</th>*/}
            {/*        /!*<th>Image_url</th>*!/*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {accommodations?.map(accommodation => (*/}
            {/*        <tr>*/}
            {/*            <th>*/}
            {/*                <button onClick={() => navigate(`${accommodation.id}`)} className="btn btn-success mb-2">Edit</button>*/}
            {/*                <button className="btn btn-danger">Disable</button>*/}
            {/*            </th>*/}
            {/*            <th>{accommodation.id}</th>*/}
            {/*            <th>{accommodation.name}</th>*/}
            {/*            <th>{accommodation.capacity}</th>*/}
            {/*            <th>{accommodation.city.name}</th>*/}
            {/*            <th>{accommodation.description}</th>*/}
            {/*            /!*<th>{accommodation.image_url.image_url}</th>*!/*/}
            {/*        </tr>*/}
            {/*    ))}*/}
            {/*    </tbody>*/}
            {/*</table>*/}
        </div>
    )
}

export default ViewHotels;