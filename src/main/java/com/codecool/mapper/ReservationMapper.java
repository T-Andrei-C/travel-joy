package com.codecool.mapper;

import com.codecool.DTO.ReservationDTO;
import com.codecool.model.Reservation;
import com.codecool.model.Room;
import com.codecool.model.TravelPackage;
import com.codecool.model.user.User;
import com.codecool.repositories.RoomRepository;
import com.codecool.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class ReservationMapper {
    private UserRepository userRepository;
    private RoomRepository roomRepository;

    public ReservationMapper(UserRepository userRepository, RoomRepository roomRepository) {
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
    }

    public Reservation DTOToReservation(ReservationDTO reservationDTO) {
        User user = userRepository.findById(reservationDTO.userId()).orElseThrow(() -> new EntityNotFoundException("user not found"));
        Room room = roomRepository.findById(reservationDTO.roomId()).orElseThrow(() -> new EntityNotFoundException("room not found"));
        TravelPackage travelPackage = null;

        if (reservationDTO.travelType().equals("travelPackage")) {
            travelPackage = room.getTravel_packages()
                    .stream()
                    .filter(tp -> tp.getCheckIn().equals(reservationDTO.check_in()) && tp.getCheckOut().equals(reservationDTO.check_out()))
                    .findAny()
                    .orElseThrow(() -> new EntityNotFoundException("travel package not found"));
        }

        Reservation reservation = Reservation.builder()
                .name(reservationDTO.name())
                .email(reservationDTO.email())
                .phoneNumber(reservationDTO.phoneNumber())
                .country(reservationDTO.country())
                .county(reservationDTO.county())
                .city(reservationDTO.city())
                .bought(reservationDTO.bought())
                .amount(reservationDTO.amount() / 100)
                .check_in(reservationDTO.check_in())
                .check_out(reservationDTO.check_out())
                .room(room)
                .user(user)
                .travelPackage(travelPackage)
                .build();
        return reservation;
    }
}
