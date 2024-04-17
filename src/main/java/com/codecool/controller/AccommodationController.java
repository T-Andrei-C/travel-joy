package com.codecool.controller;

import com.codecool.model.Accommodation;
import com.codecool.services.AccommodationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/accommodations")
public class AccommodationController {
    private final AccommodationService accommodationService;

    @GetMapping("/{itemsPerPage}/{numberOfPage}")
    public Page<Accommodation> getAccommodationPerPage(@PathVariable int itemsPerPage, @PathVariable int numberOfPage){
        return accommodationService.getAccommodationPerPage(numberOfPage, itemsPerPage);
    }

    @GetMapping("/{cityName}/{itemsPerPage}/{numberOfPage}")
    public Page<Accommodation> getAccommodationByCity(@PathVariable String cityName, @PathVariable int itemsPerPage, @PathVariable int numberOfPage){
        return accommodationService.getAllAccommodationsByCity(numberOfPage ,itemsPerPage, cityName);
    }

    @GetMapping("/{cityName}/{checkIn}/{checkOut}/{numberOfPersons}/{itemsPerPage}/{numberOfPage}")
    public Page<Accommodation> getAccommodationsSearch(@PathVariable String cityName,
                                                       @PathVariable LocalDate checkIn,
                                                       @PathVariable LocalDate checkOut,
                                                       @PathVariable Integer numberOfPersons,
                                                       @PathVariable int itemsPerPage,
                                                       @PathVariable int numberOfPage)
    {
        return accommodationService.accommodationSearch(numberOfPage, itemsPerPage, cityName, checkIn, checkOut, numberOfPersons);
    }

    @PostMapping
    public void addAccommodation(@RequestBody Accommodation accommodation){
        accommodationService.addAccommodation(accommodation);
    }
}
