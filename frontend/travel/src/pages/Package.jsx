import {useEffect, useState} from "react";
import TravelPackageCard from "../components/TravelPackageCard";
import {useParams} from "react-router-dom";
import TravelSearch from "../components/TravelSearch";
import Pagination from "../components/Pagination";
import {getAllRoomOffers, getRoomOffersByCityName, getRoomOffersByTravelSearch} from "../service/CRUDTravelPackages";
import Alert from "../components/Alert";

const Package = () => {
    const [travelPackages, setTravelPackages] = useState([]);
    const [alert, setAlert] = useState([]);
    const {destination, checkIn, checkOut, numberOfPersons, itemsPerPage, numberOfPage} = useParams();

    useEffect(() => {
        if (destination !== undefined && checkIn !== undefined && checkOut !== undefined && numberOfPersons !== undefined) {
            getRoomOffersByTravelSearch(destination, itemsPerPage, numberOfPage, checkIn, checkOut, numberOfPersons).then(roomOffers => {
                setTravelPackages(roomOffers);
            });
        } else if (destination !== undefined) {
            getRoomOffersByCityName(destination, itemsPerPage, numberOfPage).then(roomOffers => {
                setTravelPackages(roomOffers);
            })
        } else {
            getAllRoomOffers(itemsPerPage, numberOfPage).then(roomOffers => {
                setTravelPackages(roomOffers);
            })
        }
    }, [destination, checkIn, checkOut, numberOfPersons, numberOfPage])

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
                        travelPackages.content?.map(p => (
                            <TravelPackageCard key={p.id} travelPackage={p} setAlert={setAlert}/>
                        ))
                    }
                </div>
            </div>
            {
                destination !== undefined && checkIn !== undefined ?
                    <Pagination key="1" travelBundles={travelPackages}
                                link={`packages/${destination}/${checkIn}/${checkOut}/${numberOfPersons}/${travelPackages.size}`}
                                numberOfPage={travelPackages.number}/>
                    : destination !== undefined ?
                        <Pagination key="2" travelBundles={travelPackages}
                                    link={`packages/${destination}/${travelPackages.size}`}
                                    numberOfPage={travelPackages.number}/>
                        :
                        <Pagination key="3" travelBundles={travelPackages} link={`packages/${travelPackages.size}`}
                                    numberOfPage={travelPackages.number}/>
            }
            <div className="ms-3 z-3">
                <Alert alertData={alert} alertCallBack={setAlert}/>
            </div>
        </div>

    );
}

export default Package