package com.codecool.configurations;

import com.codecool.model.room.Room;
import com.codecool.model.room.RoomOffer;
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

    public boolean checkRoomOffer(Room room, LocalDate checkIn, LocalDate checkOut) {
        return room.getRoom_offers()
                .stream()
                .allMatch(ofr -> (checkOut.equals(ofr.getDate_from()) || checkOut.isBefore(ofr.getDate_from()) &&
                        checkIn.isBefore(ofr.getDate_from())) || ((checkIn.isAfter(ofr.getDate_to()) || checkIn.equals(ofr.getDate_to())) &&
                        checkOut.isAfter(ofr.getDate_to())));
    }

    public boolean checkRoomOffer(RoomOffer roomOffer, LocalDate checkIn, LocalDate checkOut){
        return (roomOffer.getDate_from().isAfter(checkIn) || roomOffer.getDate_from().equals(checkIn)) &&
                (roomOffer.getDate_to().isBefore(checkOut) || roomOffer.getDate_to().equals(checkOut));
    }
}
