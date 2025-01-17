import {API_URL} from "./API";
import {getToken} from "./AuthenticateService";

export const getAllAvailableRooms = async (accommodationsName, destination, numberOfPersons, checkIn, checkOut) => {
    const request = await fetch(`${API_URL}rooms/available/${accommodationsName}/${destination}/${checkIn}/${checkOut}/${numberOfPersons}`);
    return await request.json();
}

export const getRoomBySearch = async (roomId, accommodationName, cityName, checkIn, checkOut) => {
    const request = await fetch(`${API_URL}rooms/room/${roomId}/${accommodationName}/${cityName}/${checkIn}/${checkOut}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        }
    });
    return await request.json();
}

export const getRoomDiscountByCheckInAndCheckOut = async (roomId, checkIn, checkOut) => {
    const request = await fetch(`${API_URL}rooms/discount/${roomId}/${checkIn}/${checkOut}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        }
    });
    return await request.json();
}

export const getRoomsByAccommodationId = async (accommodationId) => {
    const request = await fetch(`${API_URL}rooms/${accommodationId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        }
    });
    return await request.json();
}

export const getRoomById = async (id) => {
    const request = await fetch(`${API_URL}rooms/room/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        }
    });
    return await request.json();
}

export const verifyRoomAvailability = async (roomId, checkIn, checkOut) => {
    const request = await fetch(`${API_URL}rooms/room/${roomId}/${checkIn}/${checkOut}/verify`);
    return await request.json();
}

export const updateRoom = async (roomId, updatedRoom) => {
    const request = await fetch(`${API_URL}rooms/room/${roomId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
        body: JSON.stringify(updatedRoom)
    })
    return await request.json();
}

export const getAllRoomTypes = async () => {
    const request = await fetch(`${API_URL}roomTypes`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        }
    });
    return await request.json();
}

export const addRoom = async (room, accommodationId) => {
    const request = await fetch(`${API_URL}rooms/accommodation/${accommodationId}/addRoom`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
        body: JSON.stringify(room)
    })
    return await request.json();
}

export const disableOrEnableRoom = async (roomId) => {
    const request = await fetch(`${API_URL}rooms/room/${roomId}/disableOrEnable`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        }
    })
    return await request.json();
}

export const updateRoomType = async (id, updatedRoomType) => {
    const request = await fetch(`${API_URL}roomTypes/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
        body: JSON.stringify(updatedRoomType)
    })
    return await request.json();
}

export const deleteRoomType = async (id) => {
    const request = await fetch(`${API_URL}roomTypes/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        }
    })
    return await request.json();
}

export const addRoomType = async (roomType) => {
    const request = await fetch(`${API_URL}roomTypes`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': getToken()
        },
        body: JSON.stringify(roomType)
    })
    return await request.json();
}

export const addRoomImage = async (roomId, fileIndex, imageFile) => {
    const request = await fetch(`${API_URL}rooms/room/${roomId}/uploadImage/${fileIndex}`, {
        method: "POST",
        headers: {
            'Authorization': getToken()
        },
        body: imageFile
    })
    return await request.json();
}

export const getRoomImage = (roomId, fileIndex) => `${API_URL}rooms/room/${roomId}/image/${fileIndex}`
