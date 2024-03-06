package com.codecool.controller;

import com.codecool.DTO.ReservationDTO;
import com.codecool.model.Reservation;
import com.codecool.services.ReservationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/travel/api/reservations")
public class ReservationController {
    private ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public List<Reservation> getAllReservation(){
        return reservationService.getAllReservation();
    }

    @PostMapping
    public void addReservation(@RequestBody ReservationDTO reservationDTO){
        reservationService.addReservation(reservationDTO);
    }
}
