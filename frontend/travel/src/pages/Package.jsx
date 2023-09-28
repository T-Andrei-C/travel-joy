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
import TravelSearch from "../components/TravelSearch";
import Pagination from "../components/Pagination";

const Package = () => {
    const [travelPackages, setTravelPackages] = useState([]);
    const [travelPackagesByCity, setTravelPackagesByCity] = useState([]);
    const [travelPackagesSearch, setTravelPackagesSearch] = useState([]);


    const {destination, checkIn, checkOut, numberOfPersons, itemsPerPage, numberOfPage} = useParams();

    useEffect(() => {
        getTravelPackagesPerPage(itemsPerPage, numberOfPage)
            .then((travelPackages) => {
                setTravelPackages(travelPackages);
            })
        if (destination !== undefined) {
            getTravelPackagesByCity(destination, itemsPerPage, numberOfPage)
                .then((packagesByCity) => {
                    setTravelPackagesByCity(packagesByCity);
                })
        }
        if (checkIn !== undefined) {
            getTravelPackagesSearch(destination, checkIn, checkOut, numberOfPersons, itemsPerPage, numberOfPage)
                .then((travelPackages) => {
                    setTravelPackagesSearch(travelPackages);
                })
        }
    }, [destination, checkIn, checkOut, numberOfPersons, numberOfPage])

    console.log(travelPackagesSearch);

    return (
        <>
            <div className="h-100 d-flex align-items-center justify-content-center pt-5">
                <h1>Search for Packages</h1>
            </div>
            <TravelSearch goingTo={destination} checkIn={checkIn} checkOut={checkOut} numberOfPersons={numberOfPersons}
                          type={"packages"}/>
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center  ms-1 me-1">
                    {
                        destination !== undefined && checkIn !== undefined ?
                            travelPackagesSearch.content?.map((p) => (
                                <TravelPackageCard key={p.id} travelPackage={p}/>
                            )) : destination !== undefined ?
                                travelPackagesByCity.content?.map((p) => (
                                    <TravelPackageCard key={p.id} travelPackage={p}/>
                                )) :
                                travelPackages.content?.map((p) => (
                                    <TravelPackageCard key={p.id} travelPackage={p}/>
                                ))
                    }
                </div>
            </div>
            {
                destination !== undefined && checkIn !== undefined ?
                    <Pagination key="1" travelBundles={travelPackagesSearch}
                                link={`packages/${destination}/${checkIn}/${checkOut}/${numberOfPersons}/${travelPackagesSearch.size}`}
                                numberOfPage={travelPackagesSearch.number}/>
                : destination !== undefined ?
                    <Pagination key="2" travelBundles={travelPackagesByCity}
                                link={`packages/${destination}/${travelPackagesByCity.size}`}
                                numberOfPage={travelPackagesByCity.number}/>
                :
                    <Pagination key="3" travelBundles={travelPackages} link={`packages/${travelPackages.size}`}
                                numberOfPage={travelPackages.number}/>
            }
        </>
    );
}

export default Package