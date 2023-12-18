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
    }).then(res => {
        if(res.status > 400) throw new Error("response error")
    });
}

// export const forgotPassword = async (forgotPassword) => {
//     return await fetch(API_URL + "users/forgotpassword", {
//         method: "PATCH",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body:JSON.stringify(forgotPassword)
//     }).catch(err => console.log(err));
// }

