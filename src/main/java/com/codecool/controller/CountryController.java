package com.codecool.controller;

import com.codecool.model.Country;
import com.codecool.services.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/countries")
public class CountryController {
    private final CountryService countryService;

    @GetMapping
    public List<Country> getAllCountries(){
        return countryService.getAllCountries();
    }

    @PostMapping
    public void addCountry(@RequestBody Country country){
        countryService.addCountry(country);
    }
}
