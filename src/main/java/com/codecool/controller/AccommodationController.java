package com.codecool.controller;

import com.codecool.model.Accommodation;
import com.codecool.services.AccommodationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/travel/api/accommodations")
public class AccommodationController {
    private AccommodationService accommodationService;

    public AccommodationController(AccommodationService accommodationService) {
        this.accommodationService = accommodationService;
    }

    @GetMapping
    public List<Accommodation> getAllAccommodation(){
        return accommodationService.getAllAccommodations();
    }

    @GetMapping("/{cityName}")
    public List<Accommodation> getAccommodationByCity(@PathVariable String cityName){
        return accommodationService.getAllAccommodationsByCity(cityName);
    }

    @PostMapping
    public void addAccommodation(@RequestBody Accommodation accommodation){
        accommodationService.addAccommodation(accommodation);
    }
}
