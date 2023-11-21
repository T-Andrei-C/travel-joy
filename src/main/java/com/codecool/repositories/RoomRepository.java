package com.codecool.repositories;

import com.codecool.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findAllByAccommodation_NameAndAccommodation_City_Name(String accommodationName,String cityName);
}
