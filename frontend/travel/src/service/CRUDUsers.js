import {API_URL} from "./API";
import {getToken} from "./AuthenticateService";

export const getAuthUser =  async () => {
    const request = await fetch(`${API_URL}users/getUser`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken()
        }
    });
    return await request.json();
}

export const changePassword = async (changePassword) => {
    const request = await fetch(`${API_URL}users/changePassword`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken()
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

export const disableUserAccount = async () => {
    const request = await fetch(`${API_URL}users/disableAccount`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        }
    })
}

export const updateUserName = async(updateUserName) => {
    const request = await fetch(`${API_URL}users/updateUserName`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": getToken()
        },
        body: JSON.stringify(updateUserName)
    })
}

