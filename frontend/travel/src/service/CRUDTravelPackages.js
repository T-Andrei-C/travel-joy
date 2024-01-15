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