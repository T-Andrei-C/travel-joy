export const getCity = async () => {
    return fetch("http://localhost:8080/travel/api/cities").then(res => res.json());
}