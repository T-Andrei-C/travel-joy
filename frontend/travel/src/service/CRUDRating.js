import {API_URL} from "./API";


export const addRating = async (reservationId, ratingValue, token) => {
    const request = await  fetch(`${API_URL}rating/${ratingValue}/${reservationId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": token
        }
    });
}

export const getRatingByUserId = async (token,reservationId) => {
    const request = await fetch (`${API_URL}rating/${reservationId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
    return await request.json();
}

export const isRated = async (token, reservationId) => {
    const request =  await fetch (`${API_URL}rating/isRated/${reservationId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
    return await request.json();
}