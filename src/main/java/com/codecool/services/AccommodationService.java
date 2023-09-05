package com.codecool.services;

import com.codecool.model.Accommodation;
import com.codecool.model.Room;
import com.codecool.repositories.AccommodationRepository;
import com.codecool.repositories.RoomRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccommodationService {
    private AccommodationRepository accommodationRepository;
    private RoomRepository roomRepository;

    public AccommodationService(AccommodationRepository accommodationRepository, RoomRepository roomRepository) {
        this.accommodationRepository = accommodationRepository;
        this.roomRepository = roomRepository;
    }

    public List<Accommodation> getAllAccommodations() {
        return accommodationRepository.findAll();
    }

    public List<Accommodation> getAllAccommodationsByCity(String cityName) {
        List<Accommodation> allAccommodations = accommodationRepository.findAll();
        return allAccommodations.stream().filter(a -> a.getCity().getName().equals(cityName)).collect(Collectors.toList());
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
}
