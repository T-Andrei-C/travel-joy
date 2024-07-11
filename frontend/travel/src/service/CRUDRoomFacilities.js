import {API_URL} from "./API";
import {getToken} from "./AuthenticateService";

export const getAllNonMatchingRoomFacilities = async (roomId) => {
    const request = await fetch(`${API_URL}room/facilities/nonMatchingFacilities/${roomId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        }
    });
    return await request.json();
}

export const getAllRoomFacilities = async () => {
    const request = await fetch(`${API_URL}room/facilities`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        }
    });
    return await request.json();
}

export const updateRoomFacility = async (id, updatedFacility) => {
    const request = await fetch(`${API_URL}room/facilities/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
        body: JSON.stringify(updatedFacility)
    })
    return await request.json();
}

export const deleteRoomFacility = async (id) => {
    const request = await fetch(`${API_URL}room/facilities/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
    })
    return await request.json();
}

export const addRoomFacility = async (facility) => {
    const request = await fetch(`${API_URL}room/facilities`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
        body: JSON.stringify(facility)
    })
    return await request.json();
}