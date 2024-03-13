import {API_URL} from "./API";

export const getTravelPackagesPerPage = async (itemsPerPage, numberOfPage) => {
    const request = await fetch(`${API_URL}packages/${itemsPerPage}/${numberOfPage}`);
    return await request.json();
}

export const getTravelPackagesByCity= async (destination , itemsPerPage, numberOfPage) => {
    const request = await fetch(`${API_URL}packages/${destination}/${itemsPerPage}/${numberOfPage}`);
    return await request.json();
}

export const getTravelPackagesSearch = async (destination, checkIn, checkOut, numberOfPersons, itemsPerPage, numberOfPage) => {
   const request = await fetch(`${API_URL}packages/${destination}/${checkIn}/${checkOut}/${numberOfPersons}/${itemsPerPage}/${numberOfPage}`);
   return await request.json();
}

export const verifyPeriodOfTime = async (roomId, checkIn, checkOut) => {
    const request = await fetch(`${API_URL}packages/verify/${roomId}/${checkIn}/${checkOut}`);
    return await request.json();
}

export const getTravelPackageByRoomId = async (roomId, checkIn, checkOut) => {
    const request = await fetch(`${API_URL}packages/travelPackage/${roomId}/${checkIn}/${checkOut}`);
    return await request.json();
}

