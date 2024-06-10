package com.codecool.DTO;

import com.codecool.model.AccommodationFacility;
import com.codecool.model.City;
import java.util.Set;

public record AccommodationDTO(
        String name,
        Integer capacity,
        String description,
        City city,
        Set<AccommodationFacility> accommodation_facilities
) {
}
