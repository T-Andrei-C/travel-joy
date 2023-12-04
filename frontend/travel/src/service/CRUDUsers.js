import {API_URL} from "./API";
import {json} from "react-router-dom";


export const getAuthUser = async (token) => {
    return fetch(API_URL + "users", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    }).then(res => res.json());
}

export const changePassword = async (token,changePassword) => {
    return fetch(API_URL + "users", {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body:JSON.stringify(changePassword)
    });
}

