package com.codecool.services;

import com.codecool.DTO.ReservationDTO;
import com.codecool.configurations.ReservationFilter;
import com.codecool.mapper.ReservationMapper;
import com.codecool.model.Reservation;
import com.codecool.model.room.Room;
import com.codecool.model.room.RoomOffer;
import com.codecool.model.user.User;
import com.codecool.repositories.ReservationRepository;
import com.codecool.repositories.RoomOfferRepository;
import com.codecool.repositories.RoomRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final ReservationMapper reservationMapper;
    private final ReservationFilter reservationFilter;
    private final RoomRepository roomRepository;
    private final RoomOfferRepository roomOfferRepository;

    public List<Reservation> getAllReservation() {
        return reservationRepository.findAll();
    }

    public void addReservation(ReservationDTO reservationDTO) {
        Reservation reservation = reservationMapper.DTOToReservation(reservationDTO);
        RoomOffer roomOffer = reservation.getRoom().getRoom_offers().stream()
                .filter(offer -> offer.getDate_from().equals(reservation.getCheck_in()) && offer.getDate_to().equals(reservation.getCheck_out()))
                .findFirst()
                .orElse(null);

        if (roomOffer != null){
            roomOffer.setAvailable(false);
            roomOfferRepository.save(roomOffer);
        }
        reservationRepository.save(reservation);
    }

    public boolean checkRoomReservation(Long roomId, LocalDate checkIn, LocalDate checkOut) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new EntityNotFoundException("room not found"));
        return reservationFilter.checkReservation(room, checkIn, checkOut);
    }

    public List<Reservation> getReservationsByUserId(Principal connectedUser){
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        return reservationRepository.getReservationsByUser(user);
    }
}

