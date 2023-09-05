package com.codecool.controller;

import com.codecool.services.AccommodationFacilityService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/travel/api/accommodation/facilities")
public class AccommodationFacilityController {
    private AccommodationFacilityService accommodationFacilityService;

    public AccommodationFacilityController(AccommodationFacilityService accommodationFacilityService) {
        this.accommodationFacilityService = accommodationFacilityService;
    }
}
