package com.codecool.controller;

import com.codecool.model.AccommodationFacility;
import com.codecool.model.Response;
import com.codecool.model.room.RoomFacility;
import com.codecool.model.room.RoomOffer;
import com.codecool.services.RoomFacilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/room/facilities")
public class RoomFacilityController {

    private final RoomFacilityService roomFacilityService;

    @PostMapping
    public Response addFacility(@RequestBody RoomFacility roomFacility) {
        return roomFacilityService.addRoomFacility(roomFacility);
    }

    @GetMapping("/nonMatchingFacilities/{roomId}")
    public List<RoomFacility> getAllRoomNonMatchingFacilities(@PathVariable Long roomId) {
        return roomFacilityService.getAllNonMatchingRoomFacilities(roomId);
    }

    @GetMapping
    public List<RoomFacility> getAllRoomFacilities() {
        return roomFacilityService.getAllRoomFacilities();
    }

    @PatchMapping("{id}")
    public Response updateAccommodationFacility(@PathVariable Long id, @RequestBody RoomFacility updatedFacility){
        return roomFacilityService.updateRoomFacility(id, updatedFacility);
    }

    @DeleteMapping("{id}")
    public Response deleteAccommodationFacility(@PathVariable Long id){
        return roomFacilityService.deleteRoomFacility(id);
    }
}
