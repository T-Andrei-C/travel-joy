import {API_URL} from "./API";
import {getToken} from "./AuthenticateService";


export const addRating = async (reservationId, ratingValue, token) => {
    const request = await  fetch(`${API_URL}rating/add/${ratingValue}/${reservationId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': getToken()
        }
    });
}

export const getRatingByUserId = async (reservationId) => {
    const request = await fetch (`${API_URL}rating/${reservationId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': getToken()
            }
        });
    return await request.json();
}

export const isRated = async (reservationId) => {
    const request =  await fetch (`${API_URL}rating/isRated/${reservationId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': getToken()
            }
        });
    return await request.json();
}

export const isRatingPresent = async (reservationId) => {
    const request =  await fetch (`${API_URL}rating/isRatingPresent/${reservationId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        }
    });
    return await request.json();
}

export const canRate = async (reservationId) => {
    const request =  await fetch (`${API_URL}rating/canRate/${reservationId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        }
    });
    return await request.json();
}

export const numberOfAccommodationRatings = async (id) => {
    const request =  await fetch (`${API_URL}rating/accommodation/${id}`);
    return await request.json();
}

