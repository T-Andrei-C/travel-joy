package com.codecool.services;

import com.codecool.model.room.RoomFacility;
import com.codecool.repositories.RoomFacilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

@RequiredArgsConstructor
@Service
public class RoomFacilityService {
    private final RoomFacilityRepository roomFacilityRepository;

    public void addFacility(RoomFacility roomFacility) {
        if (roomFacilityRepository.findAll().stream().noneMatch(rf -> rf.getName().equals(roomFacility.getName()))) {
            roomFacilityRepository.save(roomFacility);
        } else {
            throw new EntityNotFoundException("Room facility already exists");
        }
    }
}
