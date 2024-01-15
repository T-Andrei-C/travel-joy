import {API_URL} from "./API";

export const getAccommodationsPerPage = async (itemsPerPage, numberOfPage) => {
    const request = await  fetch(`${API_URL}accommodations/${itemsPerPage}/${numberOfPage}`);
    return await request.json();
}

export const getAccommodationsByCityName = async (destination, itemsPerPage, numberOfPage) => {
    const request = await fetch(`${API_URL}accommodations/${destination}/${itemsPerPage}/${numberOfPage}`);
    return await request.json();
}

export const getAccommodationsSearch = async (destination, itemsPerPage, numberOfPage, checkIn, checkOut, numberOfPersons) => {
    const request = await fetch(`${API_URL}accommodations/${destination}/${checkIn}/${checkOut}/${numberOfPersons}/${itemsPerPage}/${numberOfPage}`);
    return await request.json();
}