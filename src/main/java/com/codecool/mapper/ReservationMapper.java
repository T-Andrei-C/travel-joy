package com.codecool.mapper;

import com.codecool.DTO.ReservationDTO;
import com.codecool.configurations.ReservationFilter;
import com.codecool.model.Reservation;
import com.codecool.model.room.Room;
import com.codecool.model.user.User;
import com.codecool.repositories.RoomRepository;
import com.codecool.repositories.UserRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class ReservationMapper {
    private UserRepository userRepository;
    private RoomRepository roomRepository;
    private ReservationFilter reservationFilter;

    public ReservationMapper(UserRepository userRepository, RoomRepository roomRepository, ReservationFilter reservationFilter) {
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.reservationFilter = reservationFilter;
    }

    public Reservation DTOToReservation(ReservationDTO reservationDTO) {
        User user = userRepository.findById(reservationDTO.userId()).orElseThrow(() -> new EntityNotFoundException("user not found"));
        Room room = roomRepository.findById(reservationDTO.roomId()).orElseThrow(() -> new EntityNotFoundException("room not found"));

        if (!reservationFilter.checkReservation(room, reservationDTO.check_in(), reservationDTO.check_out())) {
            throw new EntityExistsException("Reservation already booked!");
        }

        return Reservation.builder()
                .name(reservationDTO.name())
                .email(reservationDTO.email())
                .phoneNumber(reservationDTO.phoneNumber())
                .country(reservationDTO.country())
                .county(reservationDTO.county())
                .city(reservationDTO.city())
                .amount(reservationDTO.amount() / 100)
                .check_in(reservationDTO.check_in())
                .check_out(reservationDTO.check_out())
                .room(room)
                .user(user)
                .build();
    }
}
