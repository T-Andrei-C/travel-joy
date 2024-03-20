package com.codecool.repositories;

import com.codecool.model.Accommodation;
import com.codecool.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating,Long> {
    List<Rating> findAllByReservation_Room_Accommodation(Accommodation accommodation);
    Optional<Rating> findRatingByReservation_Id  (Long reservationId);

}
