import {API_URL} from "./API";

export const addReservation = async (reservationData) => {
    const request = await  fetch(`${API_URL}reservations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(reservationData)
    });
}