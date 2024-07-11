import {API_URL} from "./API";
import {getToken} from "./AuthenticateService";

export const getPublicKey = async () => {
    const request = await fetch(`${API_URL}payment`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        }
    });
    return await request.json();
}

export const chargePayment = async (paymentData) => {
    const amount = {amount : paymentData}
    const request = await fetch(`${API_URL}payment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': getToken()
        },
        body: JSON.stringify(amount)
    });
    return await request.json();
}
