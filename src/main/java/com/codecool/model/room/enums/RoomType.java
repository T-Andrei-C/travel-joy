package com.codecool.model.room.enums;

import lombok.Getter;

@Getter
public enum RoomType {
    SINGLE(1),
    DOUBLE(2),
    TRIPLE(3),
    QUAD(4),
    QUEEN(2),
    KING(2),
    TWIN(2),
    SUITE(5);

    private final Integer capacity;
    RoomType(Integer capacity){
        this.capacity = capacity;
    }
}
