package com.codecool.controller;

import com.codecool.model.Response;
import com.codecool.model.room.RoomType;
import com.codecool.services.RoomTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/roomTypes")
public class RoomTypeController {

    private final RoomTypeService roomTypeService;

    @GetMapping
    public List<RoomType> getAllRoomTypes () {
        return roomTypeService.getAllRoomTypes();
    }

    @PatchMapping("{id}")
    public Response updateRoomType(@PathVariable Long id, @RequestBody RoomType updatedRoomType){
        return roomTypeService.updateRoomType(id, updatedRoomType);
    }

    @DeleteMapping("{id}")
    public Response deleteRoomType(@PathVariable Long id){
        return roomTypeService.deleteRoomType(id);
    }

    @PostMapping
    public Response addRoomType(@RequestBody RoomType roomType){
        return roomTypeService.addRoomType(roomType);
    }
}
