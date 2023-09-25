package com.codecool.services;

import com.codecool.configurations.ReservationFilter;
import com.codecool.model.Reservation;
import com.codecool.model.Room;
import com.codecool.repositories.ReservationRepository;
import com.codecool.repositories.RoomRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationService {
    private ReservationRepository reservationRepository;
    private RoomRepository roomRepository;
    private ReservationFilter reservationFilter;

    public ReservationService(ReservationRepository reservationRepository, RoomRepository roomRepository, ReservationFilter reservationFilter) {
        this.reservationRepository = reservationRepository;
        this.roomRepository = roomRepository;
        this.reservationFilter = reservationFilter;
    }

    public List<Reservation> getAllReservation() {
        return reservationRepository.findAll();
    }

    public void addReservation(Reservation reservation) {
        Room currentRoom = roomRepository.findById(reservation.getRoom().getId()).orElse(null);

        if (currentRoom != null) {
            if (currentRoom.getReservations().isEmpty()) {
                reservationRepository.save(reservation);
            } else {
                verifyAndAddReservation(currentRoom, reservation);
            }
        } else {
            throw new EntityNotFoundException("Room not found!");
        }
    }

    private void verifyAndAddReservation(Room currentRoom, Reservation reservation) {
        LocalDate checkIn = reservation.getCheck_in();
        LocalDate checkOut = reservation.getCheck_out();
        if (
                reservationFilter.checkBeforeReservation(currentRoom, checkIn, checkOut) ||
                reservationFilter.checkAfterReservation(currentRoom, checkIn, checkOut)
        ) {
            reservationRepository.save(reservation);
        } else {
            throw new EntityNotFoundException("The period selected is already booked!");
        }
    }
}

