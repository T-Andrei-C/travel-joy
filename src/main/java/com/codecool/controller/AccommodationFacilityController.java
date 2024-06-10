package com.codecool.controller;

import com.codecool.model.AccommodationFacility;
import com.codecool.model.Response;
import com.codecool.services.AccommodationFacilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/accommodation/facilities")
public class AccommodationFacilityController {
    private final AccommodationFacilityService accommodationFacilityService;

    @PostMapping
    public Response addAccommodationFacility(@RequestBody AccommodationFacility accommodationFacility){
        return accommodationFacilityService.addAccommodationFacility(accommodationFacility);
    }

    @GetMapping("{id}")
    public List<AccommodationFacility> getAllNonMatchingAccommodationFacilities(@PathVariable Long id){
        return accommodationFacilityService.getAllNonMatchingAccommodationFacilities(id);
    }

    @GetMapping
    public List<AccommodationFacility> getAllAccommodationFacilities(){
        return accommodationFacilityService.getAllAccommodationFacilities();
    }

    @PatchMapping("{id}")
    public Response updateAccommodationFacility(@PathVariable Long id, @RequestBody AccommodationFacility updatedFacility){
        return accommodationFacilityService.updateAccommodationFacility(id, updatedFacility);
    }

    @DeleteMapping("{id}")
    public Response deleteAccommodationFacility(@PathVariable Long id){
        return accommodationFacilityService.deleteAccommodationFacility(id);
    }
}
