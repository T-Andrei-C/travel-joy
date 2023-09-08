export const getAccommodations = async () => {
    return fetch("http://localhost:8080/travel/api/accommodations").then(res => res.json());
}