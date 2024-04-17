package com.codecool.controller;

import com.codecool.model.Accommodation;
import com.codecool.model.Rating;
import com.codecool.services.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/rating")
public class RatingController {
    private final RatingService ratingService;

    @PostMapping("/{ratingValue}/{reservationId}")
    public void addRating(@PathVariable Long reservationId , @PathVariable Double ratingValue){
        ratingService.addRating(reservationId,ratingValue);
    }

    @GetMapping("/{reservationId}")
    public Rating getRatingByUserId(@PathVariable Long reservationId){
        return ratingService.getRatingByUserId(reservationId);
    }

    @GetMapping("/isRated/{reservationId}")
    public boolean isRated(@PathVariable Long reservationId){
        return ratingService.isRated(reservationId);
    }

    @GetMapping("/accommodation/{id}")
    public Integer numberOfAccommodationRatings (@PathVariable Long id){
        return ratingService.numberOfAccommodationRatings(id);
    }
}
