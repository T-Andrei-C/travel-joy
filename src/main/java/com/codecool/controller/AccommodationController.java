package com.codecool.controller;

import com.codecool.model.Accommodation;
import com.codecool.services.AccommodationService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

    @GetMapping("/{itemsPerPage}/{numberOfPage}")
    public List<Accommodation> getAccommodationPerPage(@PathVariable int itemsPerPage, @PathVariable int numberOfPage){
        return accommodationService.getAccommodationPerPage(numberOfPage, itemsPerPage);
    }

    @GetMapping("/{cityName}/{itemsPerPage}/{numberOfPage}")
    public List<Accommodation> getAccommodationByCity(@PathVariable String cityName, @PathVariable int itemsPerPage, @PathVariable int numberOfPage){
        return accommodationService.getAllAccommodationsByCity(numberOfPage ,itemsPerPage, cityName);
    }

    @GetMapping("/{cityName}/{itemsPerPage}/{numberOfPage}/{checkIn}/{checkOut}/{numberOfPersons}")
    public List<Accommodation> getAccommodationsSearch(@PathVariable LocalDate checkIn,
                                                       @PathVariable LocalDate checkOut,
                                                       @PathVariable String cityName,
                                                       @PathVariable int itemsPerPage,
                                                       @PathVariable int numberOfPage,
                                                       @PathVariable Integer numberOfPersons)
    {
        return accommodationService.accommodationSearch(numberOfPage, itemsPerPage, cityName, checkIn, checkOut, numberOfPersons);
    }

    @PostMapping
    public void addAccommodation(@RequestBody Accommodation accommodation){
        accommodationService.addAccommodation(accommodation);
    }
}
