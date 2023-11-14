import {API_URL} from "./API";

export const getCity = async () => {
    return fetch(API_URL + "cities").then(res => res.json());
}