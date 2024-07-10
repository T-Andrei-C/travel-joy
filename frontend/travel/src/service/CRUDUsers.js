import {API_URL} from "./API";

export const getAuthUser = async (token) => {
    const request = await fetch(`${API_URL}users/getUser`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    });
    return await request.json();
}

export const changePassword = async (token, changePassword) => {
    const request = await fetch(`${API_URL}users/changePassword`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(changePassword)
    });
    return await request.json();
}

export const forgotPassword = async (forgotPassword) => {
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

export const updateUserName = async(updateUserName) => {
    const request = await fetch(`${API_URL}users/updateUserName`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateUserName)
    })
}

