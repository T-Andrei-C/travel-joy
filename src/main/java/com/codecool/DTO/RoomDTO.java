package com.codecool.DTO;

import com.codecool.model.room.RoomFacility;
import com.codecool.model.room.RoomType;

import java.util.Set;

public record RoomDTO (
        RoomType type,
        Long price,
        Set<RoomFacility> room_facilities
) {
}
