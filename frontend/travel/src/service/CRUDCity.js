import {API_URL} from "./API";

export const getCities = async () => {
    const request = await fetch(`${API_URL}cities`);
    return await request.json();
}

export const updateCity = async (id, updatedCity) => {
    const request = await fetch(`${API_URL}cities/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedCity)
    })
    return await request.json();
}

export const deleteCity = async (id) => {
    const request = await fetch(`${API_URL}cities/${id}`, {
        method: "DELETE"
    })
    return await request.json();
}

export const addCity = async (city) => {
    const request = await fetch(`${API_URL}cities`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(city)
    })
    return await request.json();
}