package com.codecool.controller;

import com.codecool.services.RoomFacilityService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/travel/api/room/facilities")
public class RoomFacilityController {
    private RoomFacilityService roomFacilityService;

    public RoomFacilityController(RoomFacilityService roomFacilityService) {
        this.roomFacilityService = roomFacilityService;
    }
}
