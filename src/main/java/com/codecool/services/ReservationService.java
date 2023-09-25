package com.codecool.services;

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

    public ReservationService(ReservationRepository reservationRepository, RoomRepository roomRepository) {
        this.reservationRepository = reservationRepository;
        this.roomRepository = roomRepository;
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

        boolean checkBeforeReservation = currentRoom.getReservations()
                .stream()
                .allMatch(rez -> checkIn.isBefore(rez.getCheck_in()) && (checkOut.equals(rez.getCheck_in()) ||
                        checkOut.isBefore(rez.getCheck_in())));
        boolean checkAfterReservation = currentRoom.getReservations()
                .stream()
                .allMatch(rez -> (checkIn.isAfter(rez.getCheck_out()) || checkIn.equals(rez.getCheck_out())) &&
                        checkOut.isAfter(rez.getCheck_out()));

        if (checkBeforeReservation) {
            reservationRepository.save(reservation);
        } else if (checkAfterReservation) {
            reservationRepository.save(reservation);
        } else {
            throw new EntityNotFoundException("The period selected is already booked!");
        }
    }
}

