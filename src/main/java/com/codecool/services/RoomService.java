package com.codecool.services;

import com.codecool.configurations.ReservationFilter;
import com.codecool.model.Room;
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
                .collect(Collectors.toList());
    }

    public Room getRoomById (Long roomId){
        return roomRepository.findById(roomId).orElseThrow(() -> new EntityNotFoundException("room not found"));
    }
}
