import {API_URL} from "./API";

export const getAllAccommodations = async () => {
    const request = await fetch(`${API_URL}accommodations`);
    return await request.json();
}

export const getAccommodationById = async (id) => {
    const request = await fetch(`${API_URL}accommodations/${id}`);
    return await request.json();
}

export const getAccommodationsPerPage = async (itemsPerPage, numberOfPage) => {
    const request = await fetch(`${API_URL}accommodations/${itemsPerPage}/${numberOfPage}`);
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

export const verifyAccommodationAvailability = async (id, checkIn, checkOut) => {
    const request = await fetch(`${API_URL}accommodations/accommodation/${id}/${checkIn}/${checkOut}/verify`);
    return await request.json();
}

export const updateAccommodation = async (accommodationId, updatedAccommodation) => {
    const request = await fetch(`${API_URL}accommodations/accommodation/${accommodationId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedAccommodation)
    })
    return await request.json();
}

export const addAccommodation = async (accommodation) => {
    const request = await fetch(`${API_URL}accommodations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(accommodation)
    })
    return await request.json();
}

export const disableOrEnableAccommodation = async (accommodationId) => {
    const request = await fetch(`${API_URL}accommodations/accommodation/${accommodationId}/disableOrEnable`, {
        method: "PATCH"
    })
    return await request.json();
}

export const addAccommodationImage = async (accommodationId, imageFile) => {
    const request = await fetch(`${API_URL}accommodations/accommodation/${accommodationId}/uploadImage`, {
        method: "POST",
        body: imageFile
    })
    return await request.json();
}

export const getAccommodationImage = (accommodationId) => `${API_URL}accommodations/accommodation/${accommodationId}/image`
