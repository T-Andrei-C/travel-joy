import {API_URL} from "./API";

export const getAuthUser = async (token) => {
    const request = await fetch(`${API_URL}users`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    });
    return await request.json();
}

export const changePassword = async (token, changePassword) => {
    const request = await fetch(`${API_URL}users`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(changePassword)
    });
    return await request.json();
}

export const forgotPassword = async (forgotPassword, setError) => {
    const request = await fetch(`${API_URL}users/forgotpassword`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(forgotPassword)
    });
    return await request.json();
}

export const disableUserAccount = async (token) => {
    const request = await fetch(`${API_URL}users/disableAccount`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
}

