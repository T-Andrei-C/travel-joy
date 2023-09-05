package com.codecool.controller;

import com.codecool.model.RoomFacility;
import com.codecool.services.RoomFacilityService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/travel/api/room/facilities")
public class RoomFacilityController {
    private RoomFacilityService roomFacilityService;

    public RoomFacilityController(RoomFacilityService roomFacilityService) {
        this.roomFacilityService = roomFacilityService;
    }

    @PostMapping
    public void addFacility(@RequestBody RoomFacility roomFacility){
        roomFacilityService.addFacility(roomFacility);
    }
}
