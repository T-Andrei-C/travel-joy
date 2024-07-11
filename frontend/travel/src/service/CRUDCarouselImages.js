import {API_URL} from "./API";
import {getToken} from "./AuthenticateService";

export const getAllCarouselImages = async () => {
    const request = await fetch(`${API_URL}carousel/images`);
    return await request.json();
}

export const addCarouselImage = async (city) => {
    const request = await fetch(`${API_URL}carousel/images`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
        body: JSON.stringify(city)
    });
    return await request.json();
}

export const deleteCarouselImage = async (carouselImageId) => {
    const request = await fetch(`${API_URL}carousel/images/${carouselImageId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
    });
    return await request.json();
}

export const updateCarouselImage = async (carouselImageId, city) => {
    const request = await fetch(`${API_URL}carousel/images/${carouselImageId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
        body: JSON.stringify(city)
    });
    return await request.json();
}

export const addImageForCarousel = async (carouselImageId, imageFile) => {
    const request = await fetch(`${API_URL}carousel/images/${carouselImageId}/addImage`, {
        method: "POST",
        headers: {
            'Authorization': getToken()
        },
        body: imageFile
    });
    return await request.json();
}

export const getImageForCarousel = (carouselImageId) => `${API_URL}carousel/images/${carouselImageId}/getImage`