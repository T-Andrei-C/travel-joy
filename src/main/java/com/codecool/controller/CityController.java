package com.codecool.controller;

import com.codecool.model.City;
import com.codecool.services.CityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/cities")

public class CityController {
    private final CityService cityService;

    @GetMapping
    public List<City> getAllCities(){
        return cityService.getAllCities();
    }

    @PostMapping
    public void addCity(@RequestBody City city){
        cityService.addCity(city);
    }


}
