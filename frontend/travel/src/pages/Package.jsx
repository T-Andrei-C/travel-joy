import {useEffect, useState} from "react";
import {getTravelPackagesPerPage} from "../service/CRUDTravelPackages";
import TravelPackageCard from "../components/TravelPackageCard";
import TravelSearch from "../components/TravelSearch";

const Package = () => {
    const [travelPackages, setTravelPackages] = useState([]);
    useEffect(() => {
        getTravelPackagesPerPage().
            then((travelPackages) => {
                setTravelPackages(travelPackages);
        })
    }, [])

    console.log(travelPackages)

    return(
        <>
        <div className="h-100 d-flex align-items-center justify-content-center pt-5">
            <h1>Search for Packages</h1>
        </div>
                <div className="container h-100">
                    <div className="row h-100 justify-content-center align-items-center  ms-1 me-1">
                {travelPackages.map(p => (
                    <TravelPackageCard key={p.id} travelPackage={p}/>
                ))}
                </div>
                </div>
        </>
    );
}

export default Package