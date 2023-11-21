import {useNavigate, useParams} from "react-router-dom";
import {FaLocationDot} from "react-icons/fa6";
import {useEffect, useState} from "react";
import {getAllAvailableRooms} from "../service/CRUDRooms";
import ViewDetailsCard from "../components/ViewDetailsCard";

const ViewDetails = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const {destination, accommodationName, checkIn, checkOut, numberOfPersons} = useParams();

    useEffect(() => {
        getAllAvailableRooms(accommodationName,destination,numberOfPersons,checkIn,checkOut).then(room => setRooms(room));
    }, []);


    return (
        <div className="d-flex justify-content-center align-items-center row p-0 m-0">
            <div className="col-xl-9 col-12 row mt-3 d-flex justify-content-md-center justify-content-sm-center align-items-md-center align-items-sm-center p-0 m-0">
                <div className="col-xl-12 col-lg-12 col-md-8 col-sm-11 col-12 text-center">
                    <h2>{accommodationName}</h2>
                    <h6 className="text-success"><FaLocationDot/> {destination}</h6>
                </div>
                {rooms.map((room, i) => (
                    <ViewDetailsCard key={i} room={room} checkIn={checkIn} checkOut={checkOut} navigate={navigate}/>
                ))}
            </div>
        </div>
    );
}

export default ViewDetails;