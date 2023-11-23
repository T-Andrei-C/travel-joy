import {API_URL} from "./API";


export const getAuthUser = async (token) => {
    return fetch(API_URL + "users",
        {
            method : 'GET',
            headers : {
                Accept:'application/json',
                Authorization : token
            }
        }
        ).then(res => res.json());
}