import {useEffect, useState} from "react";
import {
    getTravelPackagesByCity,
    getTravelPackagesPerPage,
    getTravelPackagesSearch
} from "../service/CRUDTravelPackages";
import TravelPackageCard from "../components/TravelPackageCard";
import {useParams} from "react-router-dom";
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
    console.log(travelPackages);

    return (
        // travelPackages.length === 0 && travelPackagesByCity.length === 0 && travelPackagesSearch.length === 0 ?
        //    <h1>There are no packages available</h1> :
        <div>
            <div className="h-100 text-center pt-5">
                <h1>Search for Packages</h1>
            </div>
            <div className="d-flex justify-content-center">
                <TravelSearch goingTo={destination} checkIn={checkIn} checkOut={checkOut}
                              numberOfPersons={numberOfPersons}
                              type={"packages"}/>
            </div>
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center mx-1">
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
        </div>

    );
}

export default Package