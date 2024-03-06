package com.codecool.repositories;

import com.codecool.model.Accommodation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {

    List<Accommodation> findAllByCityName (String cityName);
    Page<Accommodation> findAllByCityName(String cityName, Pageable pageable);
    @Query("SELECT a FROM Accommodation a WHERE a IN :accommodations")
    Page<Accommodation> findAllByAccommodations(List<Accommodation> accommodations, Pageable pageable);
}
