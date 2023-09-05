package com.codecool.services;

import com.codecool.repositories.RoomFacilityRepository;
import com.codecool.repositories.RoomRepository;
import org.springframework.stereotype.Service;

@Service
public class RoomService {
    private RoomRepository roomRepository;
    private RoomFacilityRepository roomFacilityRepository;

    public RoomService(RoomRepository roomRepository, RoomFacilityRepository roomFacilityRepository) {
        this.roomRepository = roomRepository;
        this.roomFacilityRepository = roomFacilityRepository;
    }
}
