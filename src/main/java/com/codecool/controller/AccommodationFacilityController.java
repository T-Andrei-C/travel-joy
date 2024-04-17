package com.codecool.controller;

import com.codecool.model.AccommodationFacility;
import com.codecool.services.AccommodationFacilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/accommodation/facilities")
public class AccommodationFacilityController {
    private final AccommodationFacilityService accommodationFacilityService;

    @PostMapping
    public void addAccommodationFacility(@RequestBody AccommodationFacility accommodationFacility){
        accommodationFacilityService.addAccommodationFacility(accommodationFacility);
    }
}
