package com.codecool.services;

import com.codecool.configurations.ReservationFilter;
import com.codecool.model.Accommodation;
import com.codecool.model.Room;
import com.codecool.repositories.AccommodationRepository;
import com.codecool.repositories.RoomRepository;
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

    public List<Accommodation> getAccommodationPerPage(int currentPage, int itemsPerPage) {
        return sortAccommodationPerPage(currentPage, itemsPerPage, accommodationRepository.findAll());
    }

    public List<Accommodation> getAllAccommodationsByCity(int currentPage, int itemsPerPage, String cityName) {
        return sortAccommodationPerPage(currentPage, itemsPerPage, filterAccommodationsByCity(cityName));
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

    public List<Accommodation> accommodationSearch(int currentPage, int itemsPerPage, String cityName,
                                                   LocalDate checkIn, LocalDate checkOut, Integer numberOfPersons) {
        List<Accommodation> filteredAccommodations = new ArrayList<>();
        List<Accommodation> filteredAccommodationsByCity = filterAccommodationsByCity(cityName);
        for (var accommodation : filteredAccommodationsByCity) {
            for (var room : accommodation.getRooms()) {
                if (room.getType().getCapacity() >= numberOfPersons) {
                    if (
                            reservationFilter.checkBeforeReservation(room, checkIn, checkOut) ||
                            reservationFilter.checkAfterReservation(room, checkIn, checkOut)
                    ) {
                        filteredAccommodations.add(accommodation);
                        break;
                    }
                }
            }
        }
        return sortAccommodationPerPage(currentPage, itemsPerPage, filteredAccommodations);
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
