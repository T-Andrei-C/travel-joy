import {API_URL} from "./API";

export const getAllNonMatchingAccommodationFacilities = async (id) => {
    const request = await fetch(`${API_URL}accommodation/facilities/${id}`);
    return await request.json();
}

export const getAllAccommodationFacilities = async () => {
    const request = await fetch(`${API_URL}accommodation/facilities`)
    return await request.json();
}

export const updateAccommodationFacility = async (id, updatedFacility) => {
    const request = await fetch(`${API_URL}accommodation/facilities/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedFacility)
    })
    return await request.json();
}

export const deleteAccommodationFacility = async (id) => {
    const request = await fetch(`${API_URL}accommodation/facilities/${id}`, {
        method: "DELETE"
    })
    return await request.json();
}

export const addAccommodationFacility = async (facility) => {
    const request = await fetch(`${API_URL}accommodation/facilities`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(facility)
    })
    return await request.json();
}
