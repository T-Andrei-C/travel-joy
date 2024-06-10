package com.codecool.services;

import com.codecool.model.Response;
import com.codecool.model.room.RoomFacility;
import com.codecool.model.room.RoomOffer;
import com.codecool.model.room.RoomOfferType;
import com.codecool.repositories.RoomOfferTypeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RoomOfferTypeService {

    private final RoomOfferTypeRepository roomOfferTypeRepository;

    public List<RoomOfferType> getAllRoomOfferTypes() {
        return roomOfferTypeRepository.findAll();
    }

    public Response updateRoomOfferType(Long id, RoomOfferType updatedRoomOfferType){
        RoomOfferType roomOfferType = roomOfferTypeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("room offer type not found"));
        if (roomOfferTypeRepository.findAll().stream().noneMatch(type -> type.getName().equals(updatedRoomOfferType.getName()))){
            roomOfferType.setName(updatedRoomOfferType.getName());
            roomOfferTypeRepository.save(roomOfferType);
            return Response.builder().content("room offer type updated").type("success").build();
        } else {
            return Response.builder().content("room offer type with the name " + updatedRoomOfferType.getName() + " already exists").type("danger").build();
        }
    }

    public Response deleteRoomOfferType(Long id){
        RoomOfferType roomOfferType = roomOfferTypeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("room offer type not found"));
        try {
            roomOfferTypeRepository.delete(roomOfferType);
            return Response.builder().content("room offer type deleted").type("success").build();
        } catch (Exception e) {
            return Response.builder().content("room offer type is in use and can't be deleted").type("danger").build();
        }
    }

    public Response addRoomOfferType(RoomOfferType roomOfferType){
        if (roomOfferTypeRepository.findAll().stream().noneMatch(type -> type.getName().equals(roomOfferType.getName()))){
            roomOfferTypeRepository.save(roomOfferType);
            return Response.builder().content("room offer type added").type("success").build();
        } else {
            return Response.builder().content("room offer type with the name " + roomOfferType.getName() + " already exists").type("danger").build();
        }
    }

}
