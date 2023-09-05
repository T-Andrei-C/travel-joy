package com.codecool.services;

import com.codecool.model.AccommodationFacility;
import com.codecool.repositories.AccommodationFacilityRepository;
import com.codecool.repositories.AccommodationRepository;
import org.springframework.stereotype.Service;

@Service
public class AccommodationFacilityService {
  private AccommodationFacilityRepository accommodationFacilityRepository;

    public AccommodationFacilityService(AccommodationFacilityRepository accommodationFacilityRepository) {
        this.accommodationFacilityRepository = accommodationFacilityRepository;
    }

    public void addAccommodationFacility(AccommodationFacility accommodationFacility){
        accommodationFacilityRepository.save(accommodationFacility);
    }
}
