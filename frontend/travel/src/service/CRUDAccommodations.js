import {API_URL} from "./API";

export const getAccommodationsPerPage = async (itemsPerPage, numberOfPage) => {
    return fetch(API_URL + "accommodations/" + itemsPerPage + "/" + numberOfPage).then(res => res.json());
}

export const getAccommodationsByCityName = async (destination, itemsPerPage, numberOfPage) => {
    return fetch(API_URL + "accommodations/" + destination + "/" + itemsPerPage + "/" + numberOfPage).then(res => res.json());
}

export const getAccommodationsSearch = async (destination, itemsPerPage, numberOfPage, checkIn, checkOut, numberOfPersons) => {
    return fetch(`${API_URL}accommodations/${destination}/${checkIn}/${checkOut}/${numberOfPersons}/${itemsPerPage}/${numberOfPage}`).then(res => res.json());
}