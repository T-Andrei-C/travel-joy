package com.codecool.controller;

import com.codecool.model.room.RoomOffer;
import com.codecool.services.RoomOfferService;
import com.codecool.services.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/roomOffers")
public class RoomOfferController {
    private final RoomOfferService roomOfferService;

    @GetMapping("/{itemsPerPage}/{numberOfPage}")
    public Page<RoomOffer> getAllRoomOffers(@PathVariable Integer itemsPerPage, @PathVariable Integer numberOfPage) {
        return roomOfferService.getAllRoomOffers(numberOfPage, itemsPerPage);
    }

    @GetMapping("/{cityName}/{itemsPerPage}/{numberOfPage}")
    public Page<RoomOffer> getRoomOffersByCity(@PathVariable String cityName, @PathVariable Integer itemsPerPage, @PathVariable Integer numberOfPage) {
        return roomOfferService.getAllRoomOffersByCityName(cityName, numberOfPage, itemsPerPage);
    }

    @GetMapping("/{cityName}/{checkIn}/{checkOut}/{numberOfPersons}/{itemsPerPage}/{numberOfPage}")
    public Page<RoomOffer> getRoomOffersByTravelSearch(@PathVariable String cityName,
                                                       @PathVariable LocalDate checkIn,
                                                       @PathVariable LocalDate checkOut,
                                                       @PathVariable Integer numberOfPersons,
                                                       @PathVariable int itemsPerPage,
                                                       @PathVariable int numberOfPage) {
        return roomOfferService.getAllRoomOffersByTravelSearch(cityName, checkIn, checkOut, numberOfPersons, numberOfPage, itemsPerPage);
    }
}
