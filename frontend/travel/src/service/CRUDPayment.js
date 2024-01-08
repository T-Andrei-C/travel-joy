import {API_URL} from "./API";

export const getPublicKey = async () => {
    return fetch(API_URL + "payment").then(response => response.json());
}

export const chargePayment = async (paymentData) => {
    return fetch(API_URL + "payment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(paymentData)
    }).then(res => res.json());
}
