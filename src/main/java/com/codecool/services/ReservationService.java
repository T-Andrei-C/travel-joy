package com.codecool.services;

import com.codecool.DTO.ReservationDTO;
import com.codecool.configurations.ReservationFilter;
import com.codecool.mapper.ReservationMapper;
import com.codecool.model.Reservation;
import com.codecool.model.Room;
import com.codecool.model.user.User;
import com.codecool.repositories.ReservationRepository;
import com.codecool.repositories.RoomRepository;
import com.codecool.repositories.TravelPackageRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final ReservationMapper reservationMapper;
//    private final TravelPackageRepository travelPackageRepository;
    private final ReservationFilter reservationFilter;
    private final RoomRepository roomRepository;

    public List<Reservation> getAllReservation() {
        return reservationRepository.findAll();
    }

    public void addReservation(ReservationDTO reservationDTO) {
        Reservation reservation = reservationMapper.DTOToReservation(reservationDTO);
        reservationRepository.save(reservation);
    }

    public void modifyTravelPackageReservation(ReservationDTO reservationDTO) {
        Reservation updatedReservation = reservationMapper.DTOToReservation(reservationDTO);
        Reservation travelPackageReservation = reservationMapper.DTOToReservation(reservationDTO).getTravelPackage().getReservation();

        travelPackageReservation.setAmount(updatedReservation.getAmount());
        travelPackageReservation.setBought(updatedReservation.getBought());
        travelPackageReservation.setCounty(updatedReservation.getCounty());
        travelPackageReservation.setCity(updatedReservation.getCity());
        travelPackageReservation.setCountry(updatedReservation.getCountry());
        travelPackageReservation.setName(updatedReservation.getName());
        travelPackageReservation.setEmail(updatedReservation.getEmail());
        travelPackageReservation.setUser(updatedReservation.getUser());
        travelPackageReservation.setPhoneNumber(updatedReservation.getPhoneNumber());

        reservationRepository.save(travelPackageReservation);
    }

    public boolean checkRoomReservation(Long roomId, LocalDate checkIn, LocalDate checkOut) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new EntityNotFoundException("room not found"));
        return reservationFilter.checkReservation(room, checkIn, checkOut);
    }

    public boolean checkTravelPackageReservation(Long roomId, LocalDate checkIn, LocalDate checkOut) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new EntityNotFoundException("room not found"));
        Reservation travelPackageReservation = room.getTravel_packages()
                .stream()
                .filter(tp -> tp.getCheckIn().equals(checkIn) && tp.getCheckOut().equals(checkOut))
                .findAny()
                .orElseThrow(() -> new EntityNotFoundException("travelPackage not found"))
                .getReservation();

        return travelPackageReservation.getTravelPackage().getReservation().getBought();
    }

    public List<Reservation> getReservationsByUserId(Principal connectedUser){
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        return reservationRepository.getReservationsByUserAndBought(user,true);
    }
}

