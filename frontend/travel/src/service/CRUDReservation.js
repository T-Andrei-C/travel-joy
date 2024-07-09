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

export const updateTravelPackageReservation = async (reservationData) => {
    const request = await  fetch(`${API_URL}reservations`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(reservationData)
    });
}

export const checkRoomReservation = async (roomId, checkIn, checkOut) => {
    const request = await  fetch(`${API_URL}reservations/checkRoom/${roomId}/${checkIn}/${checkOut}`);
    return await request.json();
}

export const checkTravelPackageReservation = async (roomId, checkIn, checkOut) => {
    const request = await  fetch(`${API_URL}reservations/checkTravelPackage/${roomId}/${checkIn}/${checkOut}`);
    return await request.json();
}

export const getReservationsByUserId = async (token) => {
    const request = await fetch(`${API_URL}reservations/myOrders`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    });
    return await request.json();
}

export const getReservationsBySearch = async (token, searchInput, searchBy) => {
    const request = await fetch(`${API_URL}reservations/myOrders/search?searchInput=${searchInput}&searchBy=${searchBy}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    });
    return await request.json();
}