package com.codecool.controller;

import com.codecool.model.room.Room;
import com.codecool.services.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/rooms")
public class RoomController {
    private final RoomService roomService;

    @GetMapping("/{accommodationName}/{cityName}/{checkIn}/{checkOut}/{capacity}")
    public List<Room> getAllAvailableRooms(@PathVariable String accommodationName, @PathVariable String cityName, @PathVariable LocalDate checkIn, @PathVariable LocalDate checkOut, @PathVariable Integer capacity){
        return roomService.getAllAvailableRooms(accommodationName,cityName,capacity,checkIn,checkOut);
    }

    @GetMapping("/room/{roomId}/{accommodationName}/{cityName}/{checkIn}/{checkOut}")
    public Room getRoomById (@PathVariable Long roomId, @PathVariable String accommodationName, @PathVariable String cityName, @PathVariable LocalDate checkIn, @PathVariable LocalDate checkOut){
        return roomService.getRoomById(roomId, accommodationName, cityName, checkIn, checkOut);
    }

    @GetMapping("discount/{roomId}/{checkIn}/{checkOut}")
    public Integer getRoomDiscountByCheckInAndCheckOut(@PathVariable Long roomId, @PathVariable LocalDate checkIn, @PathVariable LocalDate checkOut){
        return roomService.getRoomDiscountByCheckInAndCheckOut(roomId, checkIn, checkOut);
    }
}
