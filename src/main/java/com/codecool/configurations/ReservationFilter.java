package com.codecool.configurations;

import com.codecool.model.Room;
import com.codecool.model.TravelPackage;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class ReservationFilter {
    public boolean checkReservation(Room room, LocalDate checkIn, LocalDate checkOut) {
        return room.getReservations()
                .stream()
                .allMatch(rez -> (checkOut.equals(rez.getCheck_in()) || checkOut.isBefore(rez.getCheck_in()) &&
                        checkIn.isBefore(rez.getCheck_in())) || ((checkIn.isAfter(rez.getCheck_out()) || checkIn.equals(rez.getCheck_out())) &&
                        checkOut.isAfter(rez.getCheck_out())));
    }

    public boolean checkTravelPackages(TravelPackage travelPackage, LocalDate checkIn, LocalDate checkOut){
        return (travelPackage.getCheckIn().isAfter(checkIn) || travelPackage.getCheckIn().equals(checkIn)) &&
                (travelPackage.getCheckOut().isBefore(checkOut) || travelPackage.getCheckOut().equals(checkOut));
    }
}
