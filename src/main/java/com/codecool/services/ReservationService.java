package com.codecool.services;

import com.codecool.DTO.ReservationDTO;
import com.codecool.mapper.ReservationMapper;
import com.codecool.model.Reservation;
import com.codecool.repositories.ReservationRepository;
import com.codecool.repositories.TravelPackageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {
    private ReservationRepository reservationRepository;
    private ReservationMapper reservationMapper;
    private TravelPackageRepository travelPackageRepository;

    public ReservationService(ReservationRepository reservationRepository, ReservationMapper reservationMapper, TravelPackageRepository travelPackageRepository) {
        this.reservationRepository = reservationRepository;
        this.reservationMapper = reservationMapper;
        this.travelPackageRepository = travelPackageRepository;
    }

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
}

