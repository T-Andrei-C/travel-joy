package com.codecool.controller;

import com.codecool.model.Room;
import com.codecool.services.RoomService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/travel/api/rooms")
public class RoomController {
    private RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping("/{accommodationName}/{cityName}/{checkIn}/{checkOut}/{capacity}")
    public List<Room> getAllAvailableRooms(@PathVariable String accommodationName, @PathVariable String cityName, @PathVariable LocalDate checkIn, @PathVariable LocalDate checkOut, @PathVariable Integer capacity){
        return roomService.getAllAvailableRooms(accommodationName,cityName,capacity,checkIn,checkOut);
    }
}
