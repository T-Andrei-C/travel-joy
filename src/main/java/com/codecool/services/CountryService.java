package com.codecool.services;

import com.codecool.model.Country;
import com.codecool.repositories.CountryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {
    private CountryRepository countryRepository;

    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    public List<Country> getAllCountries(){
        return countryRepository.findAll();
    }

    public void addCountry(Country country){
        if(countryRepository.findAll().stream().noneMatch(c -> c.getName().equals(country.getName()))){
            countryRepository.save(country);
        }

    }
}
