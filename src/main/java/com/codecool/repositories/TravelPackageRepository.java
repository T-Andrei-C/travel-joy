package com.codecool.repositories;

import com.codecool.model.TravelPackage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TravelPackageRepository extends JpaRepository<TravelPackage, Long> {
    List<TravelPackage> findAllByRoomAccommodationCityName(String cityName);
    Page<TravelPackage> findAllByRoomAccommodationCityName(String cityName, Pageable pageable);

    @Query("SELECT a FROM TravelPackage a WHERE a IN :travelPackages")
    Page<TravelPackage> findAllByTravelPackagesSearch(List<TravelPackage> travelPackages, Pageable pageable);
}
