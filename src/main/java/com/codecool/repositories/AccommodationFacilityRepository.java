package com.codecool.repositories;

import com.codecool.model.AccommodationFacility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccommodationFacilityRepository extends JpaRepository<AccommodationFacility, Long> {
}
