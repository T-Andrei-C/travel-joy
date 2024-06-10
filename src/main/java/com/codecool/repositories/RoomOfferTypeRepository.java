package com.codecool.repositories;

import com.codecool.model.room.RoomOfferType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomOfferTypeRepository extends JpaRepository<RoomOfferType, Long> {
}
