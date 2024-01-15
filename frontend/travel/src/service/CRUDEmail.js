import {API_URL} from "./API";

export const sendEmailForForgotPassword = async (email) => {
    const request = await fetch(`${API_URL}email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(email)
    });
}