package com.codecool.services;

import com.codecool.model.City;
import com.codecool.model.Country;
import com.codecool.model.Discount;
import com.codecool.model.Response;
import com.codecool.repositories.CityRepository;
import com.codecool.repositories.CountryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CityService {
    private final CityRepository cityRepository;
    private final CountryRepository countryRepository;

    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

    public Response updateCity(Long id, City updatedCity) {
        City city = cityRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("city not found"));
        if (cityRepository.findAll().stream().noneMatch(c -> c.getName().equals(updatedCity.getName()))) {
            city.setName(updatedCity.getName());
            cityRepository.save(city);
            return Response.builder().content("city updated").type("success").build();
        } else {
            return Response.builder().content("city with the name " + updatedCity.getName() + " already exists").type("danger").build();
        }
    }

    public Response deleteCity(Long id) {
        City city = cityRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("city not found"));
        try {
            cityRepository.delete(city);
            return Response.builder().content("city deleted").type("success").build();
        } catch (Exception e) {
            return Response.builder().content("city is in use and can't be deleted").type("danger").build();
        }
    }

    public Response addCity(City city) {
        Country country = countryRepository.findById(1L).orElseThrow(() -> new EntityNotFoundException("country not found"));
        city.setCountry(country);
        if (cityRepository.findAll().stream().noneMatch(c -> c.getName().equals(city.getName()))) {
            cityRepository.save(city);
            return Response.builder().content("city added").type("success").build();
        } else {
            return Response.builder().content("city with the name " + city.getName() + " already exists").type("danger").build();
        }
    }
}
