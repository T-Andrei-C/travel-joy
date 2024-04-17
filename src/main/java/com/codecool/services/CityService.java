package com.codecool.services;

import com.codecool.model.City;
import com.codecool.repositories.CityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CityService {
    private final CityRepository cityRepository;

    public List<City> getAllCities(){
        return cityRepository.findAll();
    }

    public void addCity(City city){
        if(cityRepository.findAll().stream().noneMatch(c -> c.getName().equals(city.getName()))){
            cityRepository.save(city);
        } else {
            throw new EntityNotFoundException("City already exists");
        }
    }
}
