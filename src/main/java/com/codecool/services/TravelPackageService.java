package com.codecool.services;

import com.codecool.configurations.ReservationFilter;
import com.codecool.model.Reservation;
import com.codecool.model.TravelPackage;
import com.codecool.model.Room;
import com.codecool.repositories.ReservationRepository;
import com.codecool.repositories.TravelPackageRepository;
import com.codecool.repositories.RoomRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TravelPackageService {
    private TravelPackageRepository travelPackageRepository;
    private RoomRepository roomRepository;
    private ReservationRepository reservationRepository;
    private ReservationFilter reservationFilter;

    public TravelPackageService(TravelPackageRepository travelPackageRepository, RoomRepository roomRepository, ReservationFilter reservationFilter, ReservationRepository reservationRepository) {
        this.travelPackageRepository = travelPackageRepository;
        this.roomRepository = roomRepository;
        this.reservationRepository = reservationRepository;
        this.reservationFilter = reservationFilter;
    }

    public List<TravelPackage> getAllTravelPackages(){
        return travelPackageRepository.findAll();
    }

    public void addTravelPackage (TravelPackage travelPackage){
        Room room = roomRepository.findById(travelPackage.getRoom().getId()).orElse(null);
        if (room != null){
            if (reservationFilter.checkBeforeReservation(room, travelPackage.getCheckIn(), travelPackage.getCheckOut()) ||
                reservationFilter.checkAfterReservation(room, travelPackage.getCheckIn(), travelPackage.getCheckOut()))
            {
                travelPackageRepository.save(travelPackage);
                reservationRepository.save(new Reservation(0L, travelPackage.getCheckIn(), travelPackage.getCheckOut(), room));
            } else {
                throw new EntityNotFoundException("The period selected is already booked!");
            }
        } else {
            throw new EntityNotFoundException("The room doesn't exists!");
        }
    }
}
