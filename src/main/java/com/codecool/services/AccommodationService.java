package com.codecool.services;

import com.codecool.DTO.AccommodationDTO;
import com.codecool.configurations.ReservationFilter;
import com.codecool.model.Accommodation;
import com.codecool.model.Response;
import com.codecool.model.room.Room;
import com.codecool.repositories.AccommodationRepository;
import com.codecool.repositories.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AccommodationService {
    private final AccommodationRepository accommodationRepository;
    private final RoomRepository roomRepository;
    private final ReservationFilter reservationFilter;

    public List<Accommodation> getAllAccommodations() {
        return accommodationRepository.findAll();
    }

    public Accommodation getAccommodationById(Long id) {
        return accommodationRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Accommodation not found"));
    }

    public Page<Accommodation> getAccommodationPerPage(int currentPage, int itemsPerPage) {
        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return accommodationRepository.findAll(pageRequest);
    }

    public Page<Accommodation> getAllAccommodationsByCity(int currentPage, int itemsPerPage, String cityName) {
        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return accommodationRepository.findAllByCityName(cityName, pageRequest);
    }

    public Response addAccommodation(AccommodationDTO accommodationDTO) {
        if (accommodationRepository.findAll().stream().noneMatch(c -> c.getName().equals(accommodationDTO.name()) && c.getCity().getId().equals(accommodationDTO.city().getId()))) {
            Accommodation accommodation = Accommodation.builder()
                    .name(accommodationDTO.name())
                    .description(accommodationDTO.description())
                    .capacity(accommodationDTO.capacity())
                    .city(accommodationDTO.city())
                    .accommodation_facilities(accommodationDTO.accommodation_facilities())
                    .rating(0d)
                    .build();
            accommodationRepository.save(accommodation);
            return Response.builder().content("Accommodation added successfully").type("success").build();
        } else {
            return Response.builder().content("Accommodation with this name already exists in this city").type("warning").build();
        }
    }

    public Page<Accommodation> accommodationSearch(int currentPage, int itemsPerPage, String cityName,
                                                   LocalDate checkIn, LocalDate checkOut, Integer numberOfPersons) {

        List<Accommodation> filteredAccommodations = new ArrayList<>();
        List<Accommodation> filteredAccommodationsByCity = accommodationRepository.findAllByCityName(cityName);

        //todo change for into streams
        for (Accommodation accommodation : filteredAccommodationsByCity) {
            for (Room room : accommodation.getRooms()) {
                if (room.getType().getCapacity() >= numberOfPersons) {
                    if (reservationFilter.checkReservation(room, checkIn, checkOut) && reservationFilter.checkRoomOffer(room, checkIn, checkOut)) {
                        filteredAccommodations.add(accommodation);
                        break;
                    }
                }
            }
        }

        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return accommodationRepository.findAllByAccommodations(filteredAccommodations, pageRequest);
    }

    public Response updateAccommodation (AccommodationDTO updatedAccommodation, Long id) {
        Accommodation currentAccommodation = accommodationRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Accommodation not found"));
        List<Accommodation> accommodations = accommodationRepository.findByNameAndCityName(updatedAccommodation.name(), updatedAccommodation.city().getName());
        accommodations.remove(currentAccommodation);
        if (!accommodations.isEmpty()){
            return Response.builder().content("Accommodation with this name in this location already exists").type("warning").build();
        } else {
            if (updatedAccommodation.capacity() < currentAccommodation.getRooms().size()){
                return Response.builder().content("Accommodation capacity can't be lower than the number of rooms").type("danger").build();
            } else {
                currentAccommodation.setAccommodation_facilities(updatedAccommodation.accommodation_facilities());
                currentAccommodation.setCapacity(updatedAccommodation.capacity());
                currentAccommodation.setDescription(updatedAccommodation.description());
                currentAccommodation.setName(updatedAccommodation.name());
                currentAccommodation.setCity(updatedAccommodation.city());
                accommodationRepository.save(currentAccommodation);
                return Response.builder().content("Accommodation updated successfully").type("success").build();
            }
        }
    }
}
