package com.codecool.services;

import com.codecool.DTO.RoomOfferDTO;
import com.codecool.configurations.ReservationFilter;
import com.codecool.model.Response;
import com.codecool.model.room.Room;
import com.codecool.model.room.RoomOffer;
import com.codecool.repositories.RoomOfferRepository;
import com.codecool.repositories.RoomRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class RoomOfferService {

    private final RoomOfferRepository roomOfferRepository;
    private final ReservationFilter reservationFilter;
    private final RoomRepository roomRepository;

    public Page<RoomOffer> getAllRoomOffers(int currentPage, int itemsPerPage) {
        List<RoomOffer> roomOffers = roomOfferRepository.findAll().stream()
                .filter(RoomOffer::getAvailable)
                .toList();

        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return roomOfferRepository.findAllByRoomOffers(roomOffers, pageRequest);
    }

    public Page<RoomOffer> getAllRoomOffersByCityName(String cityName, int currentPage, int itemsPerPage) {
        List<RoomOffer> roomOffers = roomOfferRepository.findAllByRoomAccommodationCityName(cityName).stream()
                .filter(RoomOffer::getAvailable)
                .toList();

        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return roomOfferRepository.findAllByRoomOffers(roomOffers, pageRequest);
    }

    public Page<RoomOffer> getAllRoomOffersByTravelSearch(String cityName, LocalDate checkIn, LocalDate checkOut, Integer numberOfPersons, int currentPage, int itemsPerPage) {
        List<RoomOffer> roomOffers = roomOfferRepository.findAllByRoomAccommodationCityName(cityName).stream()
                .filter(RoomOffer::getAvailable)
                .filter(roomOffer -> reservationFilter.checkRoomOffer(roomOffer, checkIn, checkOut))
                .filter(roomOffer -> roomOffer.getRoom().getType().getCapacity() >= numberOfPersons)
                .toList();

        PageRequest pageRequest = PageRequest.of(currentPage, itemsPerPage);
        return roomOfferRepository.findAllByRoomOffers(roomOffers, pageRequest);
    }

    public List<RoomOffer> getAllRoomOffersByRoomId(Long roomId) {
        return roomOfferRepository.findAllByRoomId(roomId);
    }

    public RoomOffer getRoomOfferById(Long roomOfferId) {
        return roomOfferRepository.findById(roomOfferId).orElseThrow(() -> new EntityNotFoundException("room offer not found"));
    }

    public boolean checkIfRoomOfferAvailable(Long id) {
        return roomOfferRepository.findById(id).get().getAvailable();
    }

    public Response deleteRoomOffer(Long id){
        RoomOffer roomOffer = roomOfferRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("room offer not found"));
        if (roomOffer.getAvailable()){
            roomOfferRepository.delete(roomOffer);
            return Response.builder().content("Room offer has been deleted successfully").type("success").build();
        } else {
            return Response.builder().content("Room offer has been bought and can't be deleted").type("danger").build();
        }
    }

//    public Response updateRoomOffer(RoomOfferDTO updatedRoomOffer, Long id) {
//        RoomOffer currentRoomOffer = roomOfferRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("room offer not found"));
//        currentRoomOffer.getRoom().getRoom_offers().remove(currentRoomOffer);
//        if (checkRoomOfferDates(currentRoomOffer.getRoom(), updatedRoomOffer)) {
//            if (currentRoomOffer.getAvailable()) {
//                currentRoomOffer.setDate_from(updatedRoomOffer.dateFrom());
//                currentRoomOffer.setDate_to(updatedRoomOffer.dateTo());
//                currentRoomOffer.setDiscount(updatedRoomOffer.discount());
//                currentRoomOffer.setType(updatedRoomOffer.type());
//                currentRoomOffer.setAvailable(true);
//                roomOfferRepository.save(currentRoomOffer);
//            } else {
//                return Response.builder().content("room offer has been bought and cannot be modified").type("warning").build();
//            }
//        } else {
//            return Response.builder().content("room offer date from and date to overlap an exiting room offer or reservation").type("danger").build();
//        }
//        return Response.builder().content("room offer has been updated successfully").type("success").build();
//    }

    public Response addRoomOffer (RoomOfferDTO roomOfferDTO, Long roomId){
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new EntityNotFoundException("room not found"));
        if (checkRoomOfferDates(room, roomOfferDTO)){
            RoomOffer roomOffer = RoomOffer.builder()
                    .room(room)
                    .date_from(roomOfferDTO.dateFrom())
                    .date_to(roomOfferDTO.dateTo())
                    .discount(roomOfferDTO.discount())
                    .type(roomOfferDTO.type())
                    .available(true)
                    .build();
            roomOfferRepository.save(roomOffer);
            return Response.builder().content("room offer has been added successfully").type("success").build();
        }
        return Response.builder().content("room offer date_from and date_to are overlapping an already exiting room offer or reservation").type("danger").build();
    }

    private boolean checkRoomOfferDates(Room room, RoomOfferDTO roomOffer) {
        boolean checkRoomReservations = reservationFilter.checkReservation(room, roomOffer.dateFrom(), roomOffer.dateTo());
        boolean checkRoomOffers = reservationFilter.checkRoomOffer(room, roomOffer.dateFrom(), roomOffer.dateTo());
        return checkRoomOffers && checkRoomReservations;
    }
}
