package com.codecool.services;

import com.codecool.configurations.ReservationFilter;
import com.codecool.model.room.RoomOffer;
import com.codecool.repositories.RoomOfferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class RoomOfferService {

    private final RoomOfferRepository roomOfferRepository;
    private final ReservationFilter reservationFilter;

    public Page<RoomOffer> getAllRoomOffers (int currentPage, int itemsPerPage) {
        List<RoomOffer> roomOffers = roomOfferRepository.findAll().stream()
                .filter(RoomOffer::getAvailable)
                .toList();

        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return roomOfferRepository.findAllByRoomOffers(roomOffers, pageRequest);
    }

    public Page<RoomOffer> getAllRoomOffersByCityName (String cityName, int currentPage, int itemsPerPage) {
        List<RoomOffer> roomOffers = roomOfferRepository.findAllByRoomAccommodationCityName(cityName).stream()
                .filter(RoomOffer::getAvailable)
                .toList();

        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return roomOfferRepository.findAllByRoomOffers(roomOffers, pageRequest);
    }

    public Page<RoomOffer> getAllRoomOffersByTravelSearch (String cityName, LocalDate checkIn, LocalDate checkOut, Integer numberOfPersons, int currentPage, int itemsPerPage) {
        List<RoomOffer> roomOffers = roomOfferRepository.findAllByRoomAccommodationCityName(cityName).stream()
                .filter(RoomOffer::getAvailable)
                .filter(roomOffer -> reservationFilter.checkRoomOffer(roomOffer, checkIn, checkOut))
                .filter(roomOffer -> roomOffer.getRoom().getType().getCapacity() >= numberOfPersons)
                .toList();

        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return roomOfferRepository.findAllByRoomOffers(roomOffers, pageRequest);
    }
}
