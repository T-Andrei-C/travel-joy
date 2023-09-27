export const getTravelPackagesPerPage = async () => {
    return fetch("http://localhost:8080/travel/api/packages").then(res => res.json());
}