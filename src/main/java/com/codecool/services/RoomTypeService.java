package com.codecool.services;

import com.codecool.model.Response;
import com.codecool.model.room.RoomOfferType;
import com.codecool.model.room.RoomType;
import com.codecool.repositories.RoomTypeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RoomTypeService {

    private final RoomTypeRepository roomTypeRepository;

    public List<RoomType> getAllRoomTypes() {
        return roomTypeRepository.findAll();
    }

    public Response updateRoomType(Long id, RoomType updatedRoomType) {
        RoomType roomType = roomTypeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("room type not found"));
        List<RoomType> roomTypes = roomTypeRepository.findAll();
        roomTypes.remove(roomType);
        if (updatedRoomType.getCapacity() >= 1 && updatedRoomType.getCapacity() <= 5) {
            if (roomTypes.stream().noneMatch(type -> type.getName().equals(updatedRoomType.getName()))) {
                roomType.setName(updatedRoomType.getName());
                roomType.setCapacity(updatedRoomType.getCapacity());
                roomTypeRepository.save(roomType);
                return Response.builder().content("room type updated").type("success").build();
            } else {
                return Response.builder().content("room type with the name " + updatedRoomType.getName() + " already exists").type("danger").build();
            }
        } else {
            return Response.builder().content("room type capacity has to be between 1 and 5").type("danger").build();
        }
    }

    public Response deleteRoomType(Long id) {
        RoomType roomType = roomTypeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("room type not found"));
        try {
            roomTypeRepository.delete(roomType);
            return Response.builder().content("room type deleted").type("success").build();
        } catch (Exception e) {
            return Response.builder().content("room type is in use and can't be deleted").type("danger").build();
        }
    }

    public Response addRoomType(RoomType roomType) {
        if (roomType.getCapacity() >= 1 && roomType.getCapacity() <= 5) {
            if (roomTypeRepository.findAll().stream().noneMatch(type -> type.getName().equals(roomType.getName()))) {
                roomTypeRepository.save(roomType);
                return Response.builder().content("room type added").type("success").build();
            } else {
                return Response.builder().content("room type with the name " + roomType.getName() + " already exists").type("danger").build();
            }
        } else {
            return Response.builder().content("room type capacity has to be between 1 and 5").type("danger").build();
        }
    }
}
