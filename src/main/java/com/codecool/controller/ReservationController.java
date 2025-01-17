package com.codecool.controller;

import com.codecool.DTO.ReservationDTO;
import com.codecool.model.Reservation;
import com.codecool.services.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/reservations")
public class ReservationController {
    private final ReservationService reservationService;

    @GetMapping
    public List<Reservation> getAllReservation(){
        return reservationService.getAllReservation();
    }

    @PostMapping
    public void addReservation(@RequestBody ReservationDTO reservationDTO){
        reservationService.addReservation(reservationDTO);
    }

    @GetMapping("/checkRoom/{roomId}/{checkIn}/{checkOut}")
    public boolean checkRoomReservation (@PathVariable Long roomId, @PathVariable LocalDate checkIn, @PathVariable LocalDate checkOut){
        return reservationService.checkRoomReservation(roomId, checkIn, checkOut);
    }

    @GetMapping("/myOrders")
    public List<Reservation> getReservationsByUserId(Principal connectedUser){
        return reservationService.getReservationsByUserId(connectedUser);
    }

    @GetMapping("/myOrders/search")
    public List<Reservation> getReservationsBySearch(Principal connectedUser, @RequestParam String searchInput, @RequestParam String searchBy){
        return reservationService.getReservationBySearch(connectedUser, searchInput, searchBy);
    }
}
