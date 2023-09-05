package com.codecool.services;

import com.codecool.model.RoomFacility;
import com.codecool.repositories.RoomFacilityRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class RoomFacilityService {
    private RoomFacilityRepository roomFacilityRepository;

    public RoomFacilityService(RoomFacilityRepository roomFacilityRepository) {
        this.roomFacilityRepository = roomFacilityRepository;
    }

    public void addFacility(RoomFacility roomFacility) {
        if (roomFacilityRepository.findAll().stream().noneMatch(rf -> rf.getName().equals(roomFacility.getName()))) {
            roomFacilityRepository.save(roomFacility);
        } else {
            throw new EntityNotFoundException("Room facility already exists");
        }
    }
}
