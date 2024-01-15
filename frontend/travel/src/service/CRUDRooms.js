import {API_URL} from "./API";
export const getAllAvailableRooms = async (accommodationsName,destination,numberOfPersons,checkIn,checkOut) => {
    const request = await fetch(`${API_URL}rooms/${accommodationsName}/${destination}/${checkIn}/${checkOut}/${numberOfPersons}`);
    return await request.json();
}