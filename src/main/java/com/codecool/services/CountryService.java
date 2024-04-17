package com.codecool.services;

import com.codecool.model.Country;
import com.codecool.repositories.CountryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CountryService {
    private final CountryRepository countryRepository;

    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    public void addCountry(Country country) {
        if (countryRepository.findAll().stream().noneMatch(c -> c.getName().equals(country.getName()))) {
            countryRepository.save(country);
        } else {
            throw new EntityNotFoundException("Country already exists");
        }
    }
}
