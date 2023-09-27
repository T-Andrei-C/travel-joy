import {useEffect, useState} from "react";
import {
    getTravelPackagesByCity,
    getTravelPackagesPerPage,
    getTravelPackagesSearch
} from "../service/CRUDTravelPackages";
import TravelPackageCard from "../components/TravelPackageCard";
import {useParams} from "react-router-dom";
import {getAccommodationsSearch} from "../service/CRUDAccommodations";
import HotelCard from "../components/HotelCard";

const Package = () => {
    const [travelPackages, setTravelPackages] = useState([]);
    const [travelPackagesByCity, setTravelPackagesByCity] = useState([]);
    const [travelPackagesSearch,setTravelPackagesSearch] = useState([]);

    const {destination,checkIn,checkOut,numberOfPersons} = useParams();

    useEffect(() => {
        getTravelPackagesPerPage().then((travelPackages) => {
            setTravelPackages(travelPackages);
        })
        if (destination !== undefined) {
            getTravelPackagesByCity(destination)
                .then((packagesByCity) => {
                    setTravelPackagesByCity(packagesByCity);
                })
        }
        if (checkIn !== undefined){
            getTravelPackagesSearch(destination, checkIn, checkOut, numberOfPersons)
                .then((travelPackages) => {
                    setTravelPackagesSearch(travelPackages);
                })
        }
    }, [destination,checkIn,checkOut,numberOfPersons])

    console.log(travelPackagesSearch);

    return (
        <>
            <div className="h-100 d-flex align-items-center justify-content-center pt-5">
                <h1>Search for Packages</h1>
            </div>
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center  ms-1 me-1">
                    {
                        destination !== undefined ?
                            travelPackagesByCity.map((p) => (
                                <TravelPackageCard key={p.id} travelPackage={p}/>
                            )) :
                            travelPackages.map((p) => (
                                <TravelPackageCard key={p.id} travelPackage={p}/>
                            ))
                    }
                </div>
            </div>
        </>
    );
}

export default Package