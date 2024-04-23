import {API_URL} from "./API";

export const getAllAvailableRooms = async (accommodationsName, destination, numberOfPersons, checkIn, checkOut) => {
    const request = await fetch(`${API_URL}rooms/${accommodationsName}/${destination}/${checkIn}/${checkOut}/${numberOfPersons}`);
    return await request.json();
}

export const getRoomById = async (roomId, accommodationName, cityName, checkIn, checkOut) => {
    const request = await fetch(`${API_URL}rooms/room/${roomId}/${accommodationName}/${cityName}/${checkIn}/${checkOut}`);
    return await request.json();
}

export const getRoomDiscountByCheckInAndCheckOut = async (roomId, checkIn, checkOut) => {
    const request = await fetch(`${API_URL}rooms/discount/${roomId}/${checkIn}/${checkOut}`);
    return await request.json();
}
