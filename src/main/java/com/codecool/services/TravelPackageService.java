package com.codecool.services;

import com.codecool.configurations.ReservationFilter;
import com.codecool.model.Reservation;
import com.codecool.model.TravelPackage;
import com.codecool.model.Room;
import com.codecool.repositories.ReservationRepository;
import com.codecool.repositories.TravelPackageRepository;
import com.codecool.repositories.RoomRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Service
public class TravelPackageService {
    private final TravelPackageRepository travelPackageRepository;
    private final RoomRepository roomRepository;
    private final ReservationRepository reservationRepository;
    private final ReservationFilter reservationFilter;

    public TravelPackageService(TravelPackageRepository travelPackageRepository, RoomRepository roomRepository, ReservationFilter reservationFilter, ReservationRepository reservationRepository) {
        this.travelPackageRepository = travelPackageRepository;
        this.roomRepository = roomRepository;
        this.reservationRepository = reservationRepository;
        this.reservationFilter = reservationFilter;
    }

    public Page<TravelPackage> getAllTravelPackagesPerPage(int currentPage, int itemsPerPage) {
        List<TravelPackage> allTravelPackage = travelPackageRepository.findAll();
        List<TravelPackage> availableTravelPackage = allTravelPackage.stream().filter(atp -> !atp.getReservation().getBought()).toList();
        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return travelPackageRepository.findAllByTravelPackagesSearch(availableTravelPackage, pageRequest);
    }

    public Page<TravelPackage> getAllTravelPackagesByCity(int currentPage, int itemsPerPage, String cityName) {
        List<TravelPackage> allTravelPackage = travelPackageRepository.findAllByRoomAccommodationCityName(cityName);
        List<TravelPackage> availableTravelPackage = allTravelPackage.stream().filter(atp -> !atp.getReservation().getBought()).toList();

        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return travelPackageRepository.findAllByTravelPackagesSearch(availableTravelPackage, pageRequest);
    }


    public void addTravelPackage(TravelPackage travelPackage) {
        Room room = roomRepository.findById(travelPackage.getRoom().getId()).orElse(null);
        if (room != null) {
            if (reservationFilter.checkReservation(room, travelPackage.getCheckIn(), travelPackage.getCheckOut())) {
                Reservation reservation = Reservation.builder()
                        .check_in(travelPackage.getCheckIn())
                        .check_out(travelPackage.getCheckOut())
                        .room(room)
                        .bought(false)
                        .build();
                reservationRepository.save(reservation);
                travelPackage.setReservation(reservation);
                travelPackageRepository.save(travelPackage);
            } else {
                throw new EntityNotFoundException("The period selected is already booked!");
            }
        } else {
            throw new EntityNotFoundException("The room doesn't exists!");
        }
    }

    public Page<TravelPackage> travelPackagesSearch(int currentPage, int itemsPerPage, String cityName, LocalDate checkIn, LocalDate checkOut,
                                                    Integer numberOfPersons) {
        List<TravelPackage> filteredTravelPackages = new ArrayList<>();
        List<TravelPackage> filteredTravelPackagesByCity = travelPackageRepository.findAllByRoomAccommodationCityName(cityName);

        for (var travelPackage : filteredTravelPackagesByCity) {
            if (!travelPackage.getReservation().getBought()) {
                if (travelPackage.getRoom().getType().getCapacity() >= numberOfPersons) {
                    if (reservationFilter.checkTravelPackages(travelPackage, checkIn, checkOut)) {
                        filteredTravelPackages.add(travelPackage);
                        break;
                    }
                }
            }
        }

        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return travelPackageRepository.findAllByTravelPackagesSearch(filteredTravelPackages, pageRequest);
    }

    public TravelPackage getTravelPackageByRoomId (Long roomId, LocalDate checkIn, LocalDate checkOut) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new EntityNotFoundException("room not found"));
        TravelPackage travelPackage = room.getTravel_packages()
                .stream()
                .filter(tp -> tp.getCheckIn().equals(checkIn) && tp.getCheckOut().equals(checkOut))
                .findAny()
                .orElseThrow(() -> new EntityNotFoundException("travelPackage not found"));
        return travelPackage;
    }

    public boolean verifyPeriodOfTime (Long roomId, LocalDate checkIn, LocalDate checkOut) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new EntityNotFoundException("room not found"));
        return room.getTravel_packages()
                .stream()
                .anyMatch(tp -> tp.getCheckIn().equals(checkIn) && tp.getCheckOut().equals(checkOut));
    }
}
