package com.codecool.services;

import com.codecool.repositories.AccommodationRepository;
import org.springframework.stereotype.Service;

@Service
public class AccommodationFacilityService {
    private AccommodationRepository accommodationRepository;

    public AccommodationFacilityService(AccommodationRepository accommodationRepository) {
        this.accommodationRepository = accommodationRepository;
    }
}
