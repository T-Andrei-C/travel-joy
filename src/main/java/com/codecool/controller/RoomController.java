package com.codecool.controller;

import com.codecool.DTO.RoomDTO;
import com.codecool.model.Response;
import com.codecool.model.room.Room;
import com.codecool.services.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/rooms")
public class RoomController {
    private final RoomService roomService;

    @GetMapping("/{accommodationName}/{cityName}/{checkIn}/{checkOut}/{capacity}")
    public List<Room> getAllAvailableRooms(@PathVariable String accommodationName, @PathVariable String cityName, @PathVariable LocalDate checkIn, @PathVariable LocalDate checkOut, @PathVariable Integer capacity) {
        return roomService.getAllAvailableRooms(accommodationName, cityName, capacity, checkIn, checkOut);
    }

    @GetMapping("/room/{roomId}/{accommodationName}/{cityName}/{checkIn}/{checkOut}")
    public Room getRoomBySearch(@PathVariable Long roomId, @PathVariable String accommodationName, @PathVariable String cityName, @PathVariable LocalDate checkIn, @PathVariable LocalDate checkOut) {
        return roomService.getRoomBySearch(roomId, accommodationName, cityName, checkIn, checkOut);
    }

    @GetMapping("discount/{roomId}/{checkIn}/{checkOut}")
    public Integer getRoomDiscountByCheckInAndCheckOut(@PathVariable Long roomId, @PathVariable LocalDate checkIn, @PathVariable LocalDate checkOut) {
        return roomService.getRoomDiscountByCheckInAndCheckOut(roomId, checkIn, checkOut);
    }

    @GetMapping("/{accommodationId}")
    public List<Room> getRoomsByAccommodationId(@PathVariable Long accommodationId) {
        return roomService.getRoomByAccommodationId(accommodationId);
    }

    @GetMapping("room/{id}")
    public Room getRoomById(@PathVariable Long id) {
        return roomService.getRoomById(id);
    }

    @PatchMapping("room/{id}")
    public Response updateRoom(@PathVariable Long id, @RequestBody RoomDTO updatedRoom) {
        return roomService.updateRoom(updatedRoom, id);
    }

    @PostMapping("accommodation/{accommodationId}/addRoom")
    public Response addRoom(@PathVariable Long accommodationId, @RequestBody RoomDTO roomDTO) {
        return roomService.addRoom(roomDTO, accommodationId);
    }

    @PostMapping(
            value = "room/{id}/uploadImage/{fileIndex}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public Response uploadRoomImage(@PathVariable Long id, @PathVariable int fileIndex, @RequestParam("file")MultipartFile file){
        return roomService.uploadRoomImage(id, file, fileIndex);
    }

    @GetMapping(
            value = "room/{id}/image/{fileIndex}",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public byte[] getRoomImage(@PathVariable Long id, @PathVariable int fileIndex) {
        return roomService.getRoomImage(id, fileIndex);
    }
}
