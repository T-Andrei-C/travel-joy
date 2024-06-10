import {API_URL} from "./API";

export const getAllDiscounts = async () => {
    const request = await fetch(`${API_URL}discounts`);
    return await request.json();
}

export const updateDiscount = async (id, updatedDiscount) => {
    const request = await fetch(`${API_URL}discounts/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedDiscount)
    })
    return await request.json();
}

export const deleteDiscount = async (id) => {
    const request = await fetch(`${API_URL}discounts/${id}`, {
        method: "DELETE"
    })
    return await request.json();
}

export const addDiscount = async (discount) => {
    const request = await fetch(`${API_URL}discounts`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(discount)
    })
    return await request.json();
}