package com.codecool.configurations;

import com.codecool.model.Room;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class ReservationFilter {
    public boolean checkBeforeReservation(Room room, LocalDate checkIn, LocalDate checkOut) {
        return room.getReservations()
                .stream()
                .allMatch(rez -> (checkOut.equals(rez.getCheck_in()) || checkOut.isBefore(rez.getCheck_in())) &&
                                  checkIn.isBefore(rez.getCheck_in()));
    }

    public boolean checkAfterReservation(Room room, LocalDate checkIn, LocalDate checkOut) {
        return room.getReservations()
                .stream()
                .allMatch(rez -> (checkIn.isAfter(rez.getCheck_out()) || checkIn.equals(rez.getCheck_out())) &&
                                  checkOut.isAfter(rez.getCheck_out()));
    }
}
