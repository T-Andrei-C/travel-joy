import {useEffect, useState} from "react";
import {getAllAccommodations} from "../../service/CRUDAccommodations";
import {useNavigate} from "react-router-dom";
import {FaPlus} from "react-icons/fa";

const ViewHotels = () => {
    const [accommodations, setAccommodations] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAllAccommodations().then(accommodations => {
            setAccommodations(accommodations);
        })
    }, [])

    return (
        <div className="text-black">
            <table className="table-success table-bordered table-responsive table-striped table">
                <thead>
                <tr>
                    <th>
                        <button type="button" onClick={() => navigate("add")}
                                className="btn-success btn btn-sm m-1 h-25"><FaPlus/></button>
                    </th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Capacity</th>
                    <th>City</th>
                    <th>Description</th>
                    {/*<th>Image_url</th>*/}
                </tr>
                </thead>
                <tbody>
                {accommodations?.map(accommodation => (
                    <tr>
                        <th>
                            <button onClick={() => navigate(`${accommodation.id}`)} className="btn btn-success mb-2">Edit</button>
                            <button className="btn btn-danger">Disable</button>
                        </th>
                        <th>{accommodation.id}</th>
                        <th>{accommodation.name}</th>
                        <th>{accommodation.capacity}</th>
                        <th>{accommodation.city.name}</th>
                        <th>{accommodation.description}</th>
                        {/*<th>{accommodation.image_url.image_url}</th>*/}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ViewHotels;