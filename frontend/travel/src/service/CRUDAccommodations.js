// export const getAccommodations = async () => {
//     return fetch("http://localhost:8080/travel/api/accommodations").then(res => res.json());
// }

export const getAccommodationsPerPage = async (itemsPerPage, numberOfPage) => {
    return fetch("http://localhost:8080/travel/api/accommodations/" + itemsPerPage + "/" + numberOfPage).then(res => res.json());
}

export const getAccommodationsByCityName = async (destination, itemsPerPage, numberOfPage) => {
    return fetch("http://localhost:8080/travel/api/accommodations/" + destination + "/" + itemsPerPage + "/" + numberOfPage).then(res => res.json());
}

export const getAccommodationsSearch = async (destination, itemsPerPage, numberOfPage, checkIn, checkOut, numberOfPersons) => {
    return fetch(`http://localhost:8080/travel/api/accommodations/${destination}/${checkIn}/${checkOut}/${numberOfPersons}/${itemsPerPage}/${numberOfPage}`).then(res => res.json());
}