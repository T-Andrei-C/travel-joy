import {API_URL} from "./API";

export const getCity = async (token) => {
    return fetch(API_URL + "cities"
    //     {
    //     method: "GET",
    //     headers: {
    //         "Content-type" : "application/json",
    //         "Authorization" : token
    //     }
    // }
    ).then(res => res.json());
}