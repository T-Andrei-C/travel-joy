import {API_URL} from "./API";

export const getCity = async () => {
    const request = await fetch(`${API_URL}cities`);
    return await request.json();
}