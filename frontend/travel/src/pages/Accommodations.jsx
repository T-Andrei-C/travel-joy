import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import {getAccommodationsByCityName, getAccommodationsPerPage} from "../service/CRUDAccommodations";

import TravelSearch from "../components/TravelSearch";
import HotelCard from "../components/HotelCard";

const Accommodations = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [accommodationsByCity, setAccommodationsByCity] = useState([]);
    const {destination, itemsPerPage, numberOfPage} = useParams();

    useEffect(() => {
        getAccommodationsPerPage(itemsPerPage, numberOfPage)
            .then((accommodations) => {
                setAccommodations(accommodations);
            })
        getAccommodationsByCityName(destination, itemsPerPage, numberOfPage)
            .then((accommodationsByCity) => {
                setAccommodationsByCity(accommodationsByCity);
            })
    }, []);

    console.log(accommodationsByCity)

    return (
        <>
            <div className="h-100 d-flex align-items-center justify-content-center pt-5">
                <h1 className="fw-medium">Search for Accommodations</h1>
            </div>
            <TravelSearch goingTo={destination}/>
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center  ms-1 me-1">
                    {
                        accommodationsByCity.length !== 0 ?
                            accommodationsByCity.map((a) => (
                                <HotelCard accommodation={a} />
                            )) :
                            accommodations.map((a) => (
                                <HotelCard accommodation={a}/>
                            ))
                    }
                </div>
            </div>
        </>
    );

}

export default Accommodations