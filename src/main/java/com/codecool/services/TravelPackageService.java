package com.codecool.services;

import com.codecool.configurations.ReservationFilter;
import com.codecool.model.Accommodation;
import com.codecool.model.Reservation;
import com.codecool.model.TravelPackage;
import com.codecool.model.Room;
import com.codecool.repositories.ReservationRepository;
import com.codecool.repositories.TravelPackageRepository;
import com.codecool.repositories.RoomRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    public Page<TravelPackage> getTravelPackagePerPage(int currentPage, int itemsPerPage) {
        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return travelPackageRepository.findAll(pageRequest);
    }

    public Page<TravelPackage> getAllTravelPackagesByCity(int currentPage, int itemsPerPage, String cityName) {
        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return travelPackageRepository.findAllByRoomAccommodationCityName(cityName, pageRequest);
    }


    public void addTravelPackage (TravelPackage travelPackage){
        Room room = roomRepository.findById(travelPackage.getRoom().getId()).orElse(null);
        if (room != null){
            if (reservationFilter.checkReservation(room, travelPackage.getCheckIn(), travelPackage.getCheckOut()))
            {
                travelPackageRepository.save(travelPackage);
                Reservation reservation = Reservation.builder()
                        .check_in(travelPackage.getCheckIn())
                        .check_out(travelPackage.getCheckOut())
                        .room(room)
                        .build();
                reservationRepository.save(reservation);
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
        List<TravelPackage> filteredTravelPackagesByCity = getTravelPackagesByCity(cityName);
        for (var travelPackage : filteredTravelPackagesByCity) {
                if (travelPackage.getRoom().getType().getCapacity() >= numberOfPersons) {
                    if (reservationFilter.checkTravelPackages(travelPackage, checkIn, checkOut)){
                        filteredTravelPackages.add(travelPackage);
                        break;
                    }
                }
        }
        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return travelPackageRepository.findAllByTravelPackagesSearch(filteredTravelPackages,pageRequest);
    }

    private List<TravelPackage> getTravelPackagesByCity(String cityName){
        return travelPackageRepository.findAll()
                .stream()
                .filter(travelPackage -> travelPackage.getRoom().getAccommodation().getCity().getName().equals(cityName))
                .collect(Collectors.toList());
    }

}
