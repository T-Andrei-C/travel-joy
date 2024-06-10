package com.codecool.services;

import com.codecool.model.Accommodation;
import com.codecool.model.AccommodationFacility;
import com.codecool.model.Response;
import com.codecool.repositories.AccommodationFacilityRepository;
import com.codecool.repositories.AccommodationRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class AccommodationFacilityService {
    private final AccommodationFacilityRepository accommodationFacilityRepository;
    private final AccommodationRepository accommodationRepository;

    public List<AccommodationFacility> getAllNonMatchingAccommodationFacilities(Long accommodationId) {
        Set<AccommodationFacility> accommodationFacilities = accommodationRepository.findById(accommodationId).get().getAccommodation_facilities();
        return accommodationFacilityRepository.findAll().stream()
                .filter(accFacility -> accommodationFacilities.stream().noneMatch(facility -> accFacility.equals(facility)))
                .toList();
    }

    public List<AccommodationFacility> getAllAccommodationFacilities(){
        return accommodationFacilityRepository.findAll();
    }

    public Response updateAccommodationFacility(Long id, AccommodationFacility updatedFacility){
        AccommodationFacility accommodationFacility = accommodationFacilityRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("accommodation facility not found"));
        if (accommodationFacilityRepository.findAll().stream().noneMatch(facility -> facility.getName().equals(updatedFacility.getName()))){
            accommodationFacility.setName(updatedFacility.getName());
            accommodationFacilityRepository.save(accommodationFacility);
            return Response.builder().content("Accommodation facility updated").type("success").build();
        } else {
            return Response.builder().content("Accommodation facility with the name " + updatedFacility.getName() + " already exists").type("danger").build();
        }
    }

    public Response deleteAccommodationFacility(Long id){
        AccommodationFacility accommodationFacility = accommodationFacilityRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("accommodation facility not found"));
        try {
            accommodationFacilityRepository.delete(accommodationFacility);
            return Response.builder().content("Accommodation facility deleted").type("success").build();
        } catch (Exception e) {
            return Response.builder().content("Accommodation facility is in use and can't be deleted").type("danger").build();
        }
    }

    public Response addAccommodationFacility(AccommodationFacility accommodationFacility){
        if (accommodationFacilityRepository.findAll().stream().noneMatch(facility -> facility.getName().equals(accommodationFacility.getName()))){
            accommodationFacilityRepository.save(accommodationFacility);
            return Response.builder().content("Accommodation facility added").type("success").build();
        } else {
            return Response.builder().content("Accommodation facility with the name " + accommodationFacility.getName() + " already exists").type("danger").build();
        }
    }
}
