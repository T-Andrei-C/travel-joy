import {API_URL} from "./API";

export const getPublicKey = async () => {
    const request = await fetch(`${API_URL}payment`);
    return await request.json();
}

export const chargePayment = async (paymentData) => {
    const amount = {amount : paymentData}
    const request = await fetch(`${API_URL}payment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(amount)
    });
    return await request.json();
}
