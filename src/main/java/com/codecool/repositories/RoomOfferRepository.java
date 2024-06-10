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
public interface RoomOfferRepository extends JpaRepository<RoomOffer, Long> {

    List<RoomOffer> findAllByRoomAccommodationCityName(String cityName);

    @Query("SELECT r FROM RoomOffer r WHERE r IN :roomOffers")
    Page<RoomOffer> findAllByRoomOffers(List<RoomOffer> roomOffers, Pageable pageable);

    List<RoomOffer> findAllByRoomId(Long roomId);
}
