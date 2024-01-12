package com.codecool.services;

import com.codecool.configurations.ReservationFilter;
import com.codecool.model.Accommodation;
import com.codecool.model.Room;
import com.codecool.repositories.AccommodationRepository;
import com.codecool.repositories.RoomRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccommodationService {
    private AccommodationRepository accommodationRepository;
    private RoomRepository roomRepository;
    private ReservationFilter reservationFilter;

    public AccommodationService(AccommodationRepository accommodationRepository, RoomRepository roomRepository, ReservationFilter reservationFilter) {
        this.accommodationRepository = accommodationRepository;
        this.roomRepository = roomRepository;
        this.reservationFilter = reservationFilter;
    }

    public List<Accommodation> getAllAccommodations() {
        return accommodationRepository.findAll();
    }

    public Page<Accommodation> getAccommodationPerPage(int currentPage, int itemsPerPage) {
        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return accommodationRepository.findAll(pageRequest);
    }

    public Page<Accommodation> getAllAccommodationsByCity(int currentPage, int itemsPerPage, String cityName) {
        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return accommodationRepository.findAllByCityName(cityName, pageRequest);
    }

    public void addAccommodation(Accommodation accommodation) {
        if (accommodationRepository.findAll().stream().noneMatch(c -> c.getName().equals(accommodation.getName()) && c.getCity().getId().equals(accommodation.getCity().getId()))) {
            if (accommodation.getCapacity() >= accommodation.getRooms().size()) {
                accommodationRepository.save(accommodation);
                try {
                    for (Room room : accommodation.getRooms()) {
                        room.setAccommodation(accommodation);
                        roomRepository.save(room);
                    }
                } catch (Exception e) {
                    accommodationRepository.deleteById(accommodation.getId());
                }
            } else {
                throw new EntityNotFoundException("Accommodation has more rooms than its capacity");
            }
        } else {
            throw new EntityNotFoundException("The hotel already exists in this city");
        }
    }

    public Page<Accommodation> accommodationSearch(int currentPage, int itemsPerPage, String cityName,
                                                   LocalDate checkIn, LocalDate checkOut, Integer numberOfPersons) {
        List<Accommodation> filteredAccommodations = new ArrayList<>();
        List<Accommodation> filteredAccommodationsByCity = filterAccommodationsByCity(cityName);
        for (var accommodation : filteredAccommodationsByCity) {
            for (var room : accommodation.getRooms()) {
                if (room.getType().getCapacity() >= numberOfPersons) {
                    if (reservationFilter.checkReservation(room, checkIn, checkOut)) {
                        filteredAccommodations.add(accommodation);
                        break;
                    }
                }
            }
        }


        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return accommodationRepository.findAllByAccommodations(filteredAccommodations, pageRequest);
    }

    private List<Accommodation> sortAccommodationPerPage(int currentPage, int itemsPerPage, List<Accommodation> accommodations) {
        int numberOfLastEmployee = Math.min((currentPage * itemsPerPage), accommodations.size());
        int numberOfFirstEmployee = (currentPage - 1) * itemsPerPage;

        return accommodations.subList(numberOfFirstEmployee, numberOfLastEmployee);
    }

    private List<Accommodation> filterAccommodationsByCity(String cityName) {
        return accommodationRepository.findAll().stream().filter(a -> a.getCity().getName().equals(cityName)).collect(Collectors.toList());
    }


}
