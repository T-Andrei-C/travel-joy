package com.codecool.controller;

import com.codecool.model.Accommodation;
import com.codecool.model.TravelPackage;
import com.codecool.services.TravelPackageService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/travel/api/packages")
public class TravelPackageController {

    private TravelPackageService travelPackageService;

    public TravelPackageController(TravelPackageService travelPackageService) {
        this.travelPackageService = travelPackageService;
    }

    @GetMapping
    public List<TravelPackage> getAllPackages() {
        return travelPackageService.getAllTravelPackages();
    }

    @PostMapping
    public void addTravelPackage(@RequestBody TravelPackage travelPackage) {
        travelPackageService.addTravelPackage(travelPackage);
    }

    @GetMapping("/{cityName}")
    public List<TravelPackage> getTravelPackagesByCity(@PathVariable String cityName) {
        return travelPackageService.getTravelPackagesByCity(cityName);
    }

    @GetMapping("/{cityName}/{checkIn}/{checkOut}/{numberOfPersons}")
    public List<TravelPackage> travelPackagesSearch(@PathVariable String cityName,
                                                    @PathVariable LocalDate checkIn,
                                                    @PathVariable LocalDate checkOut,
                                                    @PathVariable Integer numberOfPersons) {
        return travelPackageService.travelPackagesSearch(cityName, checkIn, checkOut, numberOfPersons);
    }
}
