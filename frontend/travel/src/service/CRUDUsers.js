import {API_URL} from "./API";


export const getAuthUser = async (token) => {
    console.log(token)
    return fetch(API_URL + "users/test", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    }).then(res => res.json());
}