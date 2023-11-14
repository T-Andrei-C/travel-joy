import {API_URL} from "./API";

export const getTravelPackagesPerPage = async (itemsPerPage, numberOfPage) => {
    return fetch(`${API_URL}packages/${itemsPerPage}/${numberOfPage}`).then(res => res.json());
}

export const getTravelPackagesByCity= async (destination , itemsPerPage, numberOfPage) => {
    return fetch(API_URL + "packages/" + destination + "/" + itemsPerPage + "/" + numberOfPage ).then(res => res.json());
}

export const getTravelPackagesSearch = async (destination, checkIn, checkOut, numberOfPersons, itemsPerPage, numberOfPage) => {
    return fetch(`${API_URL}packages/${destination}/${checkIn}/${checkOut}/${numberOfPersons}/${itemsPerPage}/${numberOfPage}`).then(res => res.json());
}