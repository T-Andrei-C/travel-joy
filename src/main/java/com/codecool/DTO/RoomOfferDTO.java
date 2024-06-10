package com.codecool.DTO;

import com.codecool.model.Discount;
import com.codecool.model.room.RoomOfferType;

import java.time.LocalDate;

public record RoomOfferDTO (
    RoomOfferType type,
    Discount discount,
    LocalDate dateFrom,
    LocalDate dateTo
) {
}
