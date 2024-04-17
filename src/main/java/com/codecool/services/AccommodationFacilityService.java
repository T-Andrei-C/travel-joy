package com.codecool.services;

import com.codecool.model.AccommodationFacility;
import com.codecool.repositories.AccommodationFacilityRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AccommodationFacilityService {
    private final AccommodationFacilityRepository accommodationFacilityRepository;
  
    public void addAccommodationFacility(AccommodationFacility accommodationFacility) {
        if (accommodationFacilityRepository.findAll().stream().noneMatch(af -> af.getName().equals(accommodationFacility.getName()))) {
            accommodationFacilityRepository.save(accommodationFacility);
        } else {
            throw new EntityNotFoundException("Accommodation facility already exists");
        }
    }
}
