package com.codecool.controller;

import com.codecool.model.room.RoomFacility;
import com.codecool.services.RoomFacilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/room/facilities")
public class RoomFacilityController {

    private final RoomFacilityService roomFacilityService;

    @PostMapping
    public void addFacility(@RequestBody RoomFacility roomFacility){
        roomFacilityService.addFacility(roomFacility);
    }
}
