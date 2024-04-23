package com.codecool.services;

import com.codecool.configurations.ReservationFilter;
import com.codecool.model.room.Room;
import com.codecool.model.room.RoomOffer;
import com.codecool.repositories.RoomRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final ReservationFilter reservationFilter;

    public List<Room> getAllAvailableRooms(String accommodationName, String cityName, Integer capacity, LocalDate checkIn, LocalDate checkOut) {
        List<Room> rooms = roomRepository.findAllByAccommodation_NameAndAccommodation_City_Name(accommodationName, cityName);
        return rooms.stream()
                .filter(room -> room.getType().getCapacity() >= capacity)
                .filter(room -> reservationFilter.checkReservation(room, checkIn, checkOut))
                .filter(room -> reservationFilter.checkRoomOffer(room, checkIn, checkOut))
                .collect(Collectors.toList());
    }

    public Room getRoomById(Long roomId, String accommodationName, String cityName, LocalDate checkIn, LocalDate checkOut) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new EntityNotFoundException("room not found"));

        boolean checkRoomOfferAvailability = reservationFilter.checkRoomOffer(room, checkIn, checkOut) ||
                room.getRoom_offers().stream().anyMatch(roomOffer -> roomOffer.getDate_from().equals(checkIn) && roomOffer.getDate_to().equals(checkOut) && roomOffer.getAvailable());;

        if (room.getAccommodation().getName().equals(accommodationName) &&
                room.getAccommodation().getCity().getName().equals(cityName) &&
                reservationFilter.checkReservation(room, checkIn, checkOut) &&
                checkRoomOfferAvailability
        ) {
            return room;
        } else {
            throw new EntityNotFoundException("room not found");
        }
    }

    public Integer getRoomDiscountByCheckInAndCheckOut(Long roomId, LocalDate checkIn, LocalDate checkOut) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new EntityNotFoundException("room not found"));
        RoomOffer roomOffer = room.getRoom_offers().stream()
                .filter(offer -> offer.getDate_from().equals(checkIn) && offer.getDate_to().equals(checkOut))
                .findFirst()
                .orElse(null);
        return roomOffer != null ? roomOffer.getDiscount().getValue() : 0;
    }
}
