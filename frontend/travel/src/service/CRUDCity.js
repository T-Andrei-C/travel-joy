import {API_URL} from "./API";
import {getToken} from "./AuthenticateService";

export const getCities = async () => {
    const request = await fetch(`${API_URL}cities`);
    return await request.json();
}

export const updateCity = async (id, updatedCity) => {
    const request = await fetch(`${API_URL}cities/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
        body: JSON.stringify(updatedCity)
    })
    return await request.json();
}

export const deleteCity = async (id) => {
    const request = await fetch(`${API_URL}cities/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        }
    })
    return await request.json();
}

export const addCity = async (city) => {
    const request = await fetch(`${API_URL}cities`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
        body: JSON.stringify(city)
    })
    return await request.json();
}