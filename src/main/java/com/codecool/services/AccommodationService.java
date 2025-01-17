package com.codecool.services;

import com.codecool.DTO.AccommodationDTO;
import com.codecool.configurations.ReservationFilter;
import com.codecool.configurations.aws.S3Service;
import com.codecool.model.Accommodation;
import com.codecool.model.Response;
import com.codecool.model.room.Room;
import com.codecool.model.room.RoomOffer;
import com.codecool.repositories.AccommodationRepository;
import com.codecool.repositories.RoomOfferRepository;
import com.codecool.repositories.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AccommodationService {

    private final RoomOfferRepository roomOfferRepository;
    @Value("${bucket.name}")
    private String bucketName;

    private final AccommodationRepository accommodationRepository;
    private final RoomRepository roomRepository;
    private final ReservationFilter reservationFilter;
    private final S3Service s3Service;

    public List<Accommodation> getAllAccommodations() {
        return accommodationRepository.findAll();
    }

    public Accommodation getAccommodationById(Long id) {
        return accommodationRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Accommodation not found"));
    }

    public Page<Accommodation> getAccommodationPerPage(int currentPage, int itemsPerPage) {
        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return accommodationRepository.findAllByDisabledFalse(pageRequest);
    }

    public Page<Accommodation> getAllAccommodationsByCity(int currentPage, int itemsPerPage, String cityName) {
        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return accommodationRepository.findAllByCityNameAndDisabledFalse(cityName, pageRequest);
    }

    public Response addAccommodation(AccommodationDTO accommodationDTO) {
        if (accommodationRepository.findAll().stream().filter(a -> !a.getDisabled()).noneMatch(c -> c.getName().equals(accommodationDTO.name()) && c.getCity().getId().equals(accommodationDTO.city().getId()))) {
            if (accommodationDTO.capacity() >= 1) {
                Accommodation accommodation = Accommodation.builder()
                        .name(accommodationDTO.name())
                        .description(accommodationDTO.description())
                        .capacity(accommodationDTO.capacity())
                        .city(accommodationDTO.city())
                        .accommodation_facilities(accommodationDTO.accommodation_facilities())
                        .rating(0d)
                        .disabled(false)
                        .build();
                return Response.builder().content("Accommodation added successfully").type("success").object(accommodationRepository.save(accommodation)).build();
            } else {
                return Response.builder().content("Accommodation capacity can't be 0").type("warning").build();
            }
        } else {
            return Response.builder().content("Accommodation with this name already exists in this city").type("warning").build();
        }
    }

    public Page<Accommodation> accommodationSearch(int currentPage, int itemsPerPage, String cityName,
                                                   LocalDate checkIn, LocalDate checkOut, Integer numberOfPersons) {


        List<Accommodation> filteredAccommodationsByCity = accommodationRepository.findAllByCityNameAndDisabledFalse(cityName);
        List<Accommodation> filteredAccommodations = filteredAccommodationsByCity.stream()
                .filter(acc -> acc.getRooms().stream()
                        .anyMatch(room -> !room.getDisabled() &&
                                room.getType().getCapacity() >= numberOfPersons &&
                                reservationFilter.checkReservation(room, checkIn, checkOut) &&
                                reservationFilter.checkRoomOffer(room, checkIn, checkOut)))
                .toList();

        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return accommodationRepository.findAllByAccommodations(filteredAccommodations, pageRequest);
    }

    public Response verifyAccommodationAvailability(Long id, LocalDate checkIn, LocalDate checkOut){
        Accommodation currentAccommodation = accommodationRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Accommodation not found"));

        if (currentAccommodation.getDisabled()){
            return Response.builder().content("Accommodation is not available anymore").type("warning").object(true).build();
        }

        if (currentAccommodation.getRooms().stream()
                .filter(room -> !room.getDisabled())
                .filter(room -> reservationFilter.checkReservation(room, checkIn, checkOut))
                .filter(room -> reservationFilter.checkRoomOffer(room, checkIn, checkOut))
                .toList().isEmpty())
        {
            return Response.builder().content("Accommodation doesn't have any available rooms on the check in and check out dates provided").type("warning").object(true).build();
        };

        return Response.builder().object(false).build();
    }

    public Response updateAccommodation(AccommodationDTO updatedAccommodation, Long id) {
        Accommodation currentAccommodation = accommodationRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Accommodation not found"));
        List<Accommodation> accommodations = new ArrayList<>(accommodationRepository.findByNameAndCityName(updatedAccommodation.name(), updatedAccommodation.city().getName()).stream().filter(a -> !a.getDisabled()).toList());
        List<Room> rooms = currentAccommodation.getRooms().stream().filter(r -> !r.getDisabled()).toList();

        accommodations.remove(currentAccommodation);
        if (!accommodations.isEmpty()) {
            return Response.builder().content("Accommodation with this name in this location already exists").type("warning").build();
        } else {
            if (updatedAccommodation.capacity() < rooms.size()) {
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

    public Response disableOrEnableAccommodation (Long id) {
        Accommodation accommodation = accommodationRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Accommodation not found"));
        List<Accommodation> accommodations = accommodationRepository.findByNameAndCityName(accommodation.getName(), accommodation.getCity().getName()).stream().filter(a -> !a.getDisabled()).toList();

        if (accommodation.getDisabled()){
            if (!accommodations.isEmpty()){
                return Response.builder().content("Accommodation with this name in this city already exists").type("warning").build();
            } else {
                accommodation.setDisabled(false);
                accommodationRepository.save(accommodation);
                return Response.builder().content("Accommodation enabled successfully").type("success").build();
            }
        } else {
            accommodation.setDisabled(true);
            accommodationRepository.save(accommodation);

            List<Room> rooms = accommodation.getRooms();
            List<RoomOffer> roomOffers = rooms.stream()
                    .flatMap(room -> room.getRoom_offers().stream().filter(RoomOffer::getAvailable))
                    .toList();

            rooms.forEach(room -> room.setDisabled(true));
            roomRepository.saveAll(rooms);
            roomOfferRepository.deleteAll(roomOffers);

            return Response.builder().content("Accommodation disabled successfully").type("success").build();
        }
    }

    public Response uploadAccommodationImage(Long id, MultipartFile file) {
        Accommodation accommodation = accommodationRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Accommodation not found"));
        String imageValue = "image-" + id;
        try {
            s3Service.putObject(bucketName, "images/accommodations/accommodation-" + id + "/" + imageValue, file.getBytes());
            if (accommodation.getImage_value() == null) {
                accommodation.setImage_value(imageValue);
                accommodationRepository.save(accommodation);
            }
            return Response.builder().content("Accommodation image added successfully").type("success").build();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public byte[] getAccommodationImage(Long id) {
        Accommodation accommodation = accommodationRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Accommodation not found"));
        return s3Service.getObject(bucketName, "images/accommodations/accommodation-" + id + "/" + accommodation.getImage_value());
    }
}
