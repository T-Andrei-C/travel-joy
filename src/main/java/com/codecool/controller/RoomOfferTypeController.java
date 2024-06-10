package com.codecool.controller;

import com.codecool.model.AccommodationFacility;
import com.codecool.model.Response;
import com.codecool.model.room.RoomOfferType;
import com.codecool.services.RoomOfferTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/roomOfferTypes")
public class RoomOfferTypeController {

    private final RoomOfferTypeService roomOfferTypeService;

    @GetMapping
    public List<RoomOfferType> getAllRoomTypes () {
        return roomOfferTypeService.getAllRoomOfferTypes();
    }

    @PatchMapping("{id}")
    public Response updateRoomOfferType(@PathVariable Long id, @RequestBody RoomOfferType updatedRoomOfferType){
        return roomOfferTypeService.updateRoomOfferType(id, updatedRoomOfferType);
    }

    @DeleteMapping("{id}")
    public Response deleteRoomOfferType(@PathVariable Long id){
        return roomOfferTypeService.deleteRoomOfferType(id);
    }

    @PostMapping
    public Response addRoomOfferType(@RequestBody RoomOfferType roomOfferType){
        return roomOfferTypeService.addRoomOfferType(roomOfferType);
    }
}
