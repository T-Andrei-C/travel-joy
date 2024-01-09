package com.codecool.services;

import com.codecool.configurations.ReservationFilter;
import com.codecool.model.Room;
import com.codecool.repositories.RoomFacilityRepository;
import com.codecool.repositories.RoomRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomService {
    private RoomRepository roomRepository;
    private RoomFacilityRepository roomFacilityRepository;
    private ReservationFilter reservationFilter;

    public RoomService(RoomRepository roomRepository, RoomFacilityRepository roomFacilityRepository, ReservationFilter reservationFilter) {
        this.roomRepository = roomRepository;
        this.roomFacilityRepository = roomFacilityRepository;
        this.reservationFilter = reservationFilter;
    }

    public List<Room> getAllAvailableRooms(String accommodationName, String cityName, Integer capacity, LocalDate checkIn, LocalDate checkOut) {
        List<Room> rooms = roomRepository.findAllByAccommodation_NameAndAccommodation_City_Name(accommodationName, cityName);
//        rooms =  rooms.stream().filter(room -> room.getType().getCapacity().equals(capacity)).collect(Collectors.toList());
//        rooms = rooms.stream().filter(room -> reservationFilter.checkReservation(room,checkIn,checkOut)).collect(Collectors.toList());
        return rooms.stream()
                .filter(room -> room.getType().getCapacity() >= capacity)
                .filter(room -> reservationFilter.checkReservation(room, checkIn, checkOut))
                .collect(Collectors.toList());
    }
}
