package com.codecool.controller;

import com.codecool.DTO.ReservationDTO;
import com.codecool.model.Reservation;
import com.codecool.services.ReservationService;
import org.springframework.cglib.core.Local;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

    @PatchMapping
    public void modifyTravelPackageReservation(@RequestBody ReservationDTO reservationDTO){
        reservationService.modifyTravelPackageReservation(reservationDTO);
    }

    @GetMapping("/checkRoom/{roomId}/{checkIn}/{checkOut}")
    public boolean checkRoomReservation (@PathVariable Long roomId, @PathVariable LocalDate checkIn, @PathVariable LocalDate checkOut){
        return reservationService.checkRoomReservation(roomId, checkIn, checkOut);
    }

    @GetMapping("/checkTravelPackage/{roomId}/{checkIn}/{checkOut}")
    public boolean checkTravelPackageReservation (@PathVariable Long roomId, @PathVariable LocalDate checkIn, @PathVariable LocalDate checkOut){
        return reservationService.checkTravelPackageReservation(roomId, checkIn, checkOut);
    }
}
