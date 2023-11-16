package com.codecool.services;

import com.codecool.configurations.ReservationFilter;
import com.codecool.model.Room;
import com.codecool.repositories.RoomFacilityRepository;
import com.codecool.repositories.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    public List<Room> getAllAvailableRooms(String accommodationName, String cityName, Integer capacity){
        List<Room> rooms = roomRepository.findRoomsByAccommodation_NameAndAccommodation_City_NameAndType_Capacity(accommodationName,cityName,capacity);
        List<Room> filteredRooms = new ArrayList<>();
        for(var room : rooms){
           // if(reservationFilter.checkReservation(room))
        }
        return rooms;
    }
}
