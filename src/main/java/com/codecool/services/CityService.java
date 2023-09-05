package com.codecool.services;

import com.codecool.model.City;
import com.codecool.repositories.CityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {
    private CityRepository cityRepository;

    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public List<City> getAllCities(){
        return cityRepository.findAll();
    }

    public void addCity(City city){
        if(cityRepository.findAll().stream().noneMatch(c -> c.getName().equals(city.getName()))){
            cityRepository.save(city);
        }
    }
}
