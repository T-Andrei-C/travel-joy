package com.codecool.controller;

import com.codecool.model.City;
import com.codecool.services.CityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/travel/api/cities")

public class CityController {
    private CityService cityService;

    public CityController(CityService cityService) {
        this.cityService = cityService;
    }
    @GetMapping
    public List<City> getAllCities(){
        return cityService.getAllCities();
    }

    @PostMapping
    public void addCity(@RequestBody City city){
        cityService.addCity(city);
    }


}
