import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {getAccommodationsByCityName, getAccommodationsPerPage, getAccommodationsSearch} from "../service/CRUDAccommodations";

import TravelSearch from "../components/TravelSearch";
import HotelCard from "../components/HotelCard";
import Pagination from "../components/Pagination";

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

        if (checkIn !== undefined){
            getAccommodationsSearch(destination, itemsPerPage, numberOfPage, checkIn, checkOut, numberOfPersons)
                .then((accommodations) => {
                    setAccommodationsSearch(accommodations);
                })
        }
    }, [numberOfPage, checkIn, checkOut, numberOfPersons, destination]);

    console.log(accommodations);

    return (
        <>
            <div className="h-100 d-flex align-items-center justify-content-center pt-5">
                <h1 className="fw-medium">Search for Accommodations</h1>
            </div>
            <TravelSearch goingTo={destination} checkIn={checkIn} checkOut={checkOut} numberOfPersons={numberOfPersons} type={"accommodations"}/>
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center  ms-1 me-1">
                    {
                        destination !== undefined && checkIn !== undefined ?
                            accommodationsSearch.content?.map((a) => (
                                <HotelCard key={a.id} accommodation={a} />
                            )) : destination !== undefined ?
                            accommodationsByCity.content?.map((a) => (
                                <HotelCard key={a.id} accommodation={a} />
                            )) :
                            accommodations.content?.map((a) => (
                                <HotelCard key={a.id} accommodation={a}/>
                            ))
                    }
                </div>
            </div>
            {
                destination !== undefined && checkIn !== undefined ?
                        <Pagination key="1" travelBundles={accommodationsSearch} link={`accommodations/${destination}/${checkIn}/${checkOut}/${numberOfPersons}/${accommodationsByCity.size}`}  numberOfPage={accommodationsSearch.number}/>
                : destination !== undefined ?
                        <Pagination key="2" travelBundles={accommodationsByCity} link={`accommodations/${destination}/${accommodationsByCity.size}`} numberOfPage={accommodationsByCity.number} />
                :
                        <Pagination key="3" travelBundles={accommodations} link={`accommodations/${accommodations.size}`} numberOfPage={accommodations.number}/>
            }
        </>
    );

}

export default Accommodations