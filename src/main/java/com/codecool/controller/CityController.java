package com.codecool.controller;

import com.codecool.model.City;
import com.codecool.model.Discount;
import com.codecool.model.Response;
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

    @PatchMapping("{id}")
    public Response updateCity(@PathVariable Long id, @RequestBody City updatedCity){
        return cityService.updateCity(id, updatedCity);
    }

    @DeleteMapping("{id}")
    public Response deleteCity(@PathVariable Long id){
        return cityService.deleteCity(id);
    }

    @PostMapping
    public Response addCity(@RequestBody City city){
        return cityService.addCity(city);
    }
}
