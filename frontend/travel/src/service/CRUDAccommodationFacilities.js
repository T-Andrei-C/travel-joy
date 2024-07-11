import {API_URL} from "./API";
import {getToken} from "./AuthenticateService";

export const getAllNonMatchingAccommodationFacilities = async (id) => {
    const request = await fetch(`${API_URL}accommodation/facilities/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken()
        }
    });
    return await request.json();
}

export const getAllAccommodationFacilities = async () => {
    const request = await fetch(`${API_URL}accommodation/facilities`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken()
        }
    });
    return await request.json();
}

export const updateAccommodationFacility = async (id, updatedFacility) => {
    const request = await fetch(`${API_URL}accommodation/facilities/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
        body: JSON.stringify(updatedFacility)
    })
    return await request.json();
}

export const deleteAccommodationFacility = async (id) => {
    const request = await fetch(`${API_URL}accommodation/facilities/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        }
    })
    return await request.json();
}

export const addAccommodationFacility = async (facility) => {
    const request = await fetch(`${API_URL}accommodation/facilities`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
        body: JSON.stringify(facility)
    })
    return await request.json();
}
