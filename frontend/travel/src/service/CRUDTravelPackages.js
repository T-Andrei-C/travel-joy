export const getTravelPackagesPerPage = async (itemsPerPage, numberOfPage) => {
    return fetch(`http://localhost:8080/travel/api/packages/${itemsPerPage}/${numberOfPage}`).then(res => res.json());
}

export const getTravelPackagesByCity= async (destination , itemsPerPage, numberOfPage) => {
    return fetch("http://localhost:8080/travel/api/packages/" + destination + "/" + itemsPerPage + "/" + numberOfPage ).then(res => res.json());
}

export const getTravelPackagesSearch = async (destination, checkIn, checkOut, numberOfPersons, itemsPerPage, numberOfPage) => {
    return fetch(`http://localhost:8080/travel/api/packages/${destination}/${checkIn}/${checkOut}/${numberOfPersons}/${itemsPerPage}/${numberOfPage}`).then(res => res.json());
}