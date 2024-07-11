import {API_URL} from "./API";
import {getToken} from "./AuthenticateService";

export const getAllRoomOffers = async (itemsPerPage, numberOfPage) => {
    const request = await fetch(`${API_URL}roomOffers/${itemsPerPage}/${numberOfPage}`);
    return await request.json();
}

export const getRoomOffersByCityName = async (destination, itemsPerPage, numberOfPage) => {
    const request = await fetch(`${API_URL}roomOffers/${destination}/${itemsPerPage}/${numberOfPage}`);
    return await request.json();
}

export const getRoomOffersByTravelSearch = async (destination, itemsPerPage, numberOfPage, checkIn, checkOut, numberOfPersons) => {
    const request = await fetch(`${API_URL}roomOffers/${destination}/${checkIn}/${checkOut}/${numberOfPersons}/${itemsPerPage}/${numberOfPage}`);
    return await request.json();
}

export const getRoomOffersByRoomId = async (roomId) => {
    const request = await fetch(`${API_URL}roomOffers/room/${roomId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
    });
    return await request.json();
}

export const getRoomOfferById = async (offerId) => {
    const request = await fetch(`${API_URL}roomOffers/offer/${offerId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
    });
    return await request.json();
}

export const verifyRoomOfferAvailability = async (offerId) => {
    const request = await fetch(`${API_URL}roomOffers/offer/${offerId}/verify`);
    return await request.json();
}

export const checkIfRoomOfferAvailable = async (offerId) => {
    const request = await fetch(`${API_URL}roomOffers/offer/available/${offerId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
    });
    return await request.json();
}

export const updateRoomOffer = async (offerId, updatedRoomOffer) => {
    const request = await fetch(`${API_URL}roomOffers/offer/${offerId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
        body: JSON.stringify(updatedRoomOffer)
    })
    return await request.json();
}

export const getAllRoomOfferTypes = async () => {
    const request = await fetch(`${API_URL}roomOfferTypes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
    });
    return await request.json();
}

export const addRoomOffer = async (roomOffer, roomId) => {
    const request = await fetch(`${API_URL}roomOffers/room/${roomId}/addOffer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
        body: JSON.stringify(roomOffer)
    })
    return await request.json();
}

export const deleteRoomOffer = async (offerId) => {
    const request = await fetch(`${API_URL}roomOffers/offer/${offerId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        }
    })
    return await request.json();
}

export const updateRoomOfferType = async (id, updatedRoomOfferType) => {
    const request = await fetch(`${API_URL}roomOfferTypes/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
        body: JSON.stringify(updatedRoomOfferType)
    })
    return await request.json();
}

export const deleteRoomOfferType = async (id) => {
    const request = await fetch(`${API_URL}roomOfferTypes/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        }
    })
    return await request.json();
}

export const addRoomOfferType = async (roomOfferType) => {
    const request = await fetch(`${API_URL}roomOfferTypes`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
        body: JSON.stringify(roomOfferType)
    })
    return await request.json();
}

