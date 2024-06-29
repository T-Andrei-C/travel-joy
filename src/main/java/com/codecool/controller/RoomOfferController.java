package com.codecool.controller;

import com.codecool.DTO.RoomOfferDTO;
import com.codecool.model.Response;
import com.codecool.model.room.Room;
import com.codecool.model.room.RoomOffer;
import com.codecool.services.RoomOfferService;
import com.codecool.services.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/roomOffers")
public class RoomOfferController {
    private final RoomOfferService roomOfferService;

    @GetMapping("/{itemsPerPage}/{numberOfPage}")
    public Page<RoomOffer> getAllRoomOffers(@PathVariable Integer itemsPerPage, @PathVariable Integer numberOfPage) {
        return roomOfferService.getAllRoomOffers(numberOfPage, itemsPerPage);
    }

    @GetMapping("/{cityName}/{itemsPerPage}/{numberOfPage}")
    public Page<RoomOffer> getRoomOffersByCity(@PathVariable String cityName, @PathVariable Integer itemsPerPage, @PathVariable Integer numberOfPage) {
        return roomOfferService.getAllRoomOffersByCityName(cityName, numberOfPage, itemsPerPage);
    }

    @GetMapping("/{cityName}/{checkIn}/{checkOut}/{numberOfPersons}/{itemsPerPage}/{numberOfPage}")
    public Page<RoomOffer> getRoomOffersByTravelSearch(@PathVariable String cityName,
                                                       @PathVariable LocalDate checkIn,
                                                       @PathVariable LocalDate checkOut,
                                                       @PathVariable Integer numberOfPersons,
                                                       @PathVariable int itemsPerPage,
                                                       @PathVariable int numberOfPage) {
        return roomOfferService.getAllRoomOffersByTravelSearch(cityName, checkIn, checkOut, numberOfPersons, numberOfPage, itemsPerPage);
    }

    @GetMapping("/room/{roomId}")
    public List<RoomOffer> getAllRoomOffersByRoomId (@PathVariable Long roomId){
        return roomOfferService.getAllRoomOffersByRoomId(roomId);
    }

    @GetMapping("/offer/{id}")
    public RoomOffer getRoomOfferById(@PathVariable Long id){
        return roomOfferService.getRoomOfferById(id);
    }

    @GetMapping("/offer/available/{id}")
    public Boolean checkIfRoomOfferAvailable(@PathVariable Long id){
        return roomOfferService.checkIfRoomOfferAvailable(id);
    }

    @GetMapping("/offer/{id}/verify")
    public Response verifyRoomOfferAvailability(@PathVariable Long id){
        return roomOfferService.verifyRoomOfferAvailability(id);
    }

//    @PatchMapping("/offer/{id}")
//    public Response updateRoomOffer (@PathVariable Long id, @RequestBody RoomOfferDTO updatedRoomOffer){
//        Response response = roomOfferService.updateRoomOffer(updatedRoomOffer, id);
//        return response;
//    }

    @DeleteMapping("/offer/{id}")
    public Response deleteRoomOffer(@PathVariable Long id){
        return roomOfferService.deleteRoomOffer(id);
    }

    @PostMapping("/room/{roomId}/addOffer")
    public Response addRoomOffer (@PathVariable Long roomId, @RequestBody RoomOfferDTO roomOfferDTO){
        return roomOfferService.addRoomOffer(roomOfferDTO, roomId);
    }
}
