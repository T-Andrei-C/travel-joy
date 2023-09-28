package com.codecool.controller;

import com.codecool.model.Accommodation;
import com.codecool.model.TravelPackage;
import com.codecool.services.TravelPackageService;
import org.springframework.data.domain.Page;
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

    @GetMapping("/{itemsPerPage}/{numberOfPage}")
    public Page<TravelPackage> getAccommodationPerPage(@PathVariable int itemsPerPage, @PathVariable int numberOfPage){
        return travelPackageService.getTravelPackagePerPage(numberOfPage,itemsPerPage);
    }

    @GetMapping("/{cityName}/{itemsPerPage}/{numberOfPage}")
    public Page<TravelPackage> getTravelPackagesByCity(@PathVariable String cityName, @PathVariable int itemsPerPage, @PathVariable int numberOfPage){
        return travelPackageService.getAllTravelPackagesByCity(numberOfPage,itemsPerPage,cityName);
    }

    @PostMapping
    public void addTravelPackage(@RequestBody TravelPackage travelPackage) {
        travelPackageService.addTravelPackage(travelPackage);
    }

    @GetMapping("/{cityName}/{checkIn}/{checkOut}/{numberOfPersons}/{itemsPerPage}/{numberOfPage}")
    public Page<TravelPackage> travelPackagesSearch(@PathVariable String cityName,
                                                    @PathVariable LocalDate checkIn,
                                                    @PathVariable LocalDate checkOut,
                                                    @PathVariable Integer numberOfPersons,
                                                    @PathVariable int itemsPerPage,
                                                    @PathVariable int numberOfPage) {
        return travelPackageService.travelPackagesSearch(numberOfPage,itemsPerPage,cityName, checkIn, checkOut, numberOfPersons);
    }
}
