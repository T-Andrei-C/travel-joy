package com.codecool.services;

import com.codecool.repositories.AccommodationRepository;
import org.springframework.stereotype.Service;

@Service
public class AccommodationService {
    private AccommodationRepository accommodationRepository;

    public AccommodationService(AccommodationRepository accommodationRepository) {
        this.accommodationRepository = accommodationRepository;
    }
}
