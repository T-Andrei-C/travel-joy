import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {getAccommodationsByCityName, getAccommodationsPerPage, getAccommodationsSearch} from "../service/CRUDAccommodations";

import TravelSearch from "../components/TravelSearch";
import HotelCard from "../components/HotelCard";

const Accommodations = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [accommodationsByCity, setAccommodationsByCity] = useState([]);
    const [accommodationsSearch, setAccommodationsSearch] = useState([]);
    const {destination, itemsPerPage, numberOfPage, checkIn, checkOut, numberOfPersons} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getAccommodationsPerPage(itemsPerPage, numberOfPage)
            .then((accommodations) => {
                setAccommodations(accommodations);
            })
        if (destination !== undefined){
            getAccommodationsByCityName(destination, itemsPerPage, numberOfPage)
                .then((accommodationsByCity) => {
                    setAccommodationsByCity(accommodationsByCity);
                })
        }

        getAccommodationsSearch(destination, itemsPerPage, numberOfPage, checkIn, checkOut, numberOfPersons)
            .then((accommodations) => {
                setAccommodationsSearch(accommodations);
            })
    }, [numberOfPage]);

    console.log(accommodationsSearch)

    return (
        <>
            <div className="h-100 d-flex align-items-center justify-content-center pt-5">
                <h1 className="fw-medium">Search for Accommodations</h1>
            </div>
            <TravelSearch goingTo={destination}/>
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center  ms-1 me-1">
                    {
                        destination !== undefined ?
                            accommodationsByCity.map((a) => (
                                <HotelCard accommodation={a} />
                            )) :
                            accommodations.map((a) => (
                                <HotelCard accommodation={a}/>
                            ))
                    }
                </div>
            </div>
            {
                destination !== undefined ?
                    <div className="d-flex justify-content-evenly mt-5">
                        <button className="btn btn-outline-success" onClick={() => navigate("/accommodations/" + destination + "/" + itemsPerPage + "/" + (parseInt(numberOfPage) - 1))}>Back</button>
                        <button className="btn btn-outline-success" onClick={() => navigate("/accommodations/" + destination + "/" + itemsPerPage + "/" + (parseInt(numberOfPage) + 1))}>Next</button>
                    </div> :
                    <div className="d-flex justify-content-evenly mt-5">
                        <button className="btn btn-outline-success" onClick={() => navigate("/accommodations/" + itemsPerPage + "/" + (parseInt(numberOfPage) - 1))}>Back</button>
                        <button className="btn btn-outline-success" onClick={() => navigate("/accommodations/" + itemsPerPage + "/" + (parseInt(numberOfPage) + 1))}>Next</button>
                    </div>
            }
        </>
    );

}

export default Accommodations