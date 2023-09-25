package com.codecool.model.enums;

public enum RoomType {
    SINGLE(1),
    DOUBLE(2),
    TRIPLE(3),
    QUAD(4),
    QUEEN(2),
    KING(2),
    TWIN(2),
    SUITE(5);

    private Integer capacity;
    RoomType(Integer capacity){
        this.capacity = capacity;
    }

    public Integer getCapacity() {
        return capacity;
    }
}
