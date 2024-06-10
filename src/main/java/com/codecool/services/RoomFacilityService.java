package com.codecool.services;

import com.codecool.model.Response;
import com.codecool.model.room.RoomFacility;
import com.codecool.repositories.RoomFacilityRepository;
import com.codecool.repositories.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class RoomFacilityService {
    private final RoomFacilityRepository roomFacilityRepository;
    private final RoomRepository roomRepository;

    public List<RoomFacility> getAllNonMatchingRoomFacilities(Long accommodationId) {
        Set<RoomFacility> roomFacilities = roomRepository.findById(accommodationId).get().getRoom_facilities();
        return roomFacilityRepository.findAll().stream()
                .filter(roomFacility -> roomFacilities.stream().noneMatch(facility -> roomFacility.equals(facility)))
                .toList();
    }

    public List<RoomFacility> getAllRoomFacilities(){
        return roomFacilityRepository.findAll();
    }

    public Response updateRoomFacility(Long id, RoomFacility updatedFacility){
        RoomFacility roomFacility = roomFacilityRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("room facility not found"));
        if (roomFacilityRepository.findAll().stream().noneMatch(facility -> facility.getName().equals(updatedFacility.getName()))){
            roomFacility.setName(updatedFacility.getName());
            roomFacilityRepository.save(roomFacility);
            return Response.builder().content("room facility updated").type("success").build();
        } else {
            return Response.builder().content("room facility with the name " + updatedFacility.getName() + " already exists").type("danger").build();
        }
    }

    public Response deleteRoomFacility(Long id){
        RoomFacility roomFacility = roomFacilityRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("room facility not found"));
        try {
            roomFacilityRepository.delete(roomFacility);
            return Response.builder().content("room facility deleted").type("success").build();
        } catch (Exception e) {
            return Response.builder().content("room facility is in use and can't be deleted").type("danger").build();
        }
    }

    public Response addRoomFacility(RoomFacility roomFacility){
        if (roomFacilityRepository.findAll().stream().noneMatch(facility -> facility.getName().equals(roomFacility.getName()))){
            roomFacilityRepository.save(roomFacility);
            return Response.builder().content("room facility added").type("success").build();
        } else {
            return Response.builder().content("room facility with the name " + roomFacility.getName() + " already exists").type("danger").build();
        }
    }
}
