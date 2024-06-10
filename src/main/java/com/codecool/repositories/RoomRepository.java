package com.codecool.repositories;

import com.codecool.model.room.Room;
import com.codecool.model.room.RoomOffer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findAllByAccommodation_NameAndAccommodation_City_Name(String accommodationName, String cityName);
    List<Room> findAllByAccommodation_Id(Long accommodationId);
}
