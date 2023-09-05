package com.codecool.services;

import com.codecool.repositories.RoomFacilityRepository;
import org.springframework.stereotype.Service;

@Service
public class RoomFacilityService {
    private RoomFacilityRepository roomFacilityRepository;

    public RoomFacilityService(RoomFacilityRepository roomFacilityRepository) {
        this.roomFacilityRepository = roomFacilityRepository;
    }
}
