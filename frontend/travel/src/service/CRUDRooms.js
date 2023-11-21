import {API_URL} from "./API";
export const getAllAvailableRooms = async (accommodationsName,destination,numberOfPersons,checkIn,checkOut) => {
    return fetch(`${API_URL}rooms/${accommodationsName}/${destination}/${checkIn}/${checkOut}/${numberOfPersons}`).then(res => res.json());
}