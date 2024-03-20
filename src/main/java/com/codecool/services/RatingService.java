package com.codecool.services;

import com.codecool.model.Accommodation;
import com.codecool.model.Rating;
import com.codecool.model.Reservation;
import com.codecool.repositories.AccommodationRepository;
import com.codecool.repositories.RatingRepository;
import com.codecool.repositories.ReservationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {
    private final RatingRepository ratingRepository;
    private final AccommodationRepository accommodationRepository;
    private final ReservationRepository reservationRepository;

    public RatingService(RatingRepository ratingRepository, AccommodationRepository accommodationRepository, ReservationRepository reservationRepository) {
        this.ratingRepository = ratingRepository;
        this.accommodationRepository = accommodationRepository;
        this.reservationRepository = reservationRepository;
    }

    public void addRating(Long reservationId, Double ratingValue) {
        Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
        if (ratingRepository.findRatingByReservation_Id(reservationId).orElse(null) == null) {
            Rating rating = Rating.builder()
                    .reservation(reservation)
                    .ratingValue(ratingValue)
                    .build();
            ratingRepository.save(rating);
        } else {
            Rating existingRating = ratingRepository.findRatingByReservation_Id(reservationId).orElse(null);
            existingRating.setRatingValue(ratingValue);
            ratingRepository.save(existingRating);
        }
        List<Rating> allAccommodationRating = ratingRepository.findAllByReservation_Room_Accommodation(reservation.getRoom().getAccommodation());
        Double averageRating = allAccommodationRating.stream().mapToDouble(Rating::getRatingValue).average().getAsDouble();
        Accommodation currentAccommodation = reservation.getRoom().getAccommodation();
        currentAccommodation.setRating(averageRating);
        accommodationRepository.save(currentAccommodation);
    }

    public Rating getRatingByUserId(Long reservationId) {
        return ratingRepository.findRatingByReservation_Id(reservationId).orElse(
                Rating.builder()
                        .ratingValue((double) 0)
                        .reservation(null)
                        .build()
        );
    }

    public boolean isRated(Long reservationId) {
        Rating rating = ratingRepository.findRatingByReservation_Id(reservationId).orElse(null);
        return rating == null;
    }


}
