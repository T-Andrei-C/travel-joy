package com.codecool.controller;

import com.codecool.model.TravelPackage;
import com.codecool.services.TravelPackageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/travel/api/packages")
public class TravelPackageController {

    private TravelPackageService travelPackageService;

    public TravelPackageController(TravelPackageService travelPackageService) {
        this.travelPackageService = travelPackageService;
    }

    @GetMapping
    public List<TravelPackage> getAllPackages (){
        return travelPackageService.getAllTravelPackages();
    }

    @PostMapping
    public void addTravelPackage (@RequestBody TravelPackage travelPackage){
        travelPackageService.addTravelPackage(travelPackage);
    }
}
