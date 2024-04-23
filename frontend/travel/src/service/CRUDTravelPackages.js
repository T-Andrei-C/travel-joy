import {API_URL} from "./API";

export const getAllRoomOffers = async (itemsPerPage, numberOfPage) => {
    const request = await fetch(`${API_URL}roomOffers/${itemsPerPage}/${numberOfPage}`);
    return await request.json();
}

export const getRoomOffersByCityName = async (destination, itemsPerPage, numberOfPage) => {
    const request = await fetch(`${API_URL}roomOffers/${destination}/${itemsPerPage}/${numberOfPage}`);
    return await request.json();
}

export const getRoomOffersByTravelSearch = async (destination, itemsPerPage, numberOfPage, checkIn, checkOut, numberOfPersons) => {
    const request = await fetch(`${API_URL}roomOffers/${destination}/${checkIn}/${checkOut}/${numberOfPersons}/${itemsPerPage}/${numberOfPage}`);
    return await request.json();
}

