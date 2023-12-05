import {API_URL} from "./API";

export const sendEmailForForgotPassword = async (email) => {
    return fetch(API_URL + "email", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(email)
    })
}