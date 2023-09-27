export const getTravelPackagesPerPage = async () => {
    return fetch("http://localhost:8080/travel/api/packages").then(res => res.json());
}

export const getTravelPackagesByCity= async (destination) => {
    return fetch("http://localhost:8080/travel/api/packages/" + destination).then(res => res.json());
}

export const getTravelPackagesSearch = async (destination, checkIn, checkOut, numberOfPersons) => {
    return fetch(`http://localhost:8080/travel/api/packages/${destination}/${checkIn}/${checkOut}/${numberOfPersons}`).then(res => res.json());
}