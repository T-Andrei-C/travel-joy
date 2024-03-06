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

        if (reservation.getTravelPackage() != null){
            reservation.getTravelPackage().setReservation(reservation);
            travelPackageRepository.save(reservation.getTravelPackage());
        }
    }
}

