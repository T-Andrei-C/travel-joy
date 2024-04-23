package com.codecool.services;

import com.codecool.model.Accommodation;
import com.codecool.model.Rating;
import com.codecool.model.Reservation;
import com.codecool.model.user.User;
import com.codecool.repositories.AccommodationRepository;
import com.codecool.repositories.RatingRepository;
import com.codecool.repositories.ReservationRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class RatingService {
    private final RatingRepository ratingRepository;
    private final AccommodationRepository accommodationRepository;
    private final ReservationRepository reservationRepository;

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

    public boolean isRated(Long reservationId, Principal connectedUser) {
        Reservation reservation = reservationRepository.findById(reservationId).orElseThrow(() -> new EntityNotFoundException("reservation not found"));
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        if (reservation.getCheck_out().isBefore(LocalDate.now())){
            return true;
        }

        if (!reservation.getUser().getId().equals(user.getId())){
            return true;
        }

        return ratingRepository.findRatingByReservation_Id(reservationId).isPresent();
    }

    public boolean canRate(Long reservationId){
        Reservation reservation = reservationRepository.findById(reservationId).orElseThrow(() -> new EntityNotFoundException("reservation not found"));
        return reservation.getCheck_out().isBefore(LocalDate.now());
    }

    public boolean isRatingPresent (Long reservationId) {
        return ratingRepository.findRatingByReservation_Id(reservationId).isPresent();
    }

    public Integer numberOfAccommodationRatings(Long id) {
//        System.out.println(ratingRepository.findAllByReservation_Room_Accommodation_id(id).size());
        return ratingRepository.findAllByReservation_Room_Accommodation_id(id).size();
//        return 0;
    }
}
