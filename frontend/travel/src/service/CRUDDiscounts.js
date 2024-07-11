import {API_URL} from "./API";
import {getToken} from "./AuthenticateService";

export const getAllDiscounts = async () => {
    const request = await fetch(`${API_URL}discounts`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        }
    });
    return await request.json();
}

export const updateDiscount = async (id, updatedDiscount) => {
    const request = await fetch(`${API_URL}discounts/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
        body: JSON.stringify(updatedDiscount)
    })
    return await request.json();
}

export const deleteDiscount = async (id) => {
    const request = await fetch(`${API_URL}discounts/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        }
    })
    return await request.json();
}

export const addDiscount = async (discount) => {
    const request = await fetch(`${API_URL}discounts`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
        body: JSON.stringify(discount)
    })
    return await request.json();
}