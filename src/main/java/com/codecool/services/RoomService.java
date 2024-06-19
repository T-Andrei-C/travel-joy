package com.codecool.services;

import com.codecool.DTO.RoomDTO;
import com.codecool.configurations.ReservationFilter;
import com.codecool.configurations.aws.S3Service;
import com.codecool.model.Accommodation;
import com.codecool.model.Image;
import com.codecool.model.Response;
import com.codecool.model.room.Room;
import com.codecool.model.room.RoomOffer;
import com.codecool.repositories.AccommodationRepository;
import com.codecool.repositories.ImageRepository;
import com.codecool.repositories.RoomRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class RoomService {

    private final ImageRepository imageRepository;
    @Value("${bucket.name}")
    private String bucketName;

    private final RoomRepository roomRepository;
    private final ReservationFilter reservationFilter;
    private final AccommodationRepository accommodationRepository;
    private final S3Service s3Service;

    public List<Room> getAllAvailableRooms(String accommodationName, String cityName, Integer capacity, LocalDate checkIn, LocalDate checkOut) {
        List<Room> rooms = roomRepository.findAllByAccommodation_NameAndAccommodation_City_Name(accommodationName, cityName);
        return rooms.stream()
                .filter(room -> room.getType().getCapacity() >= capacity)
                .filter(room -> reservationFilter.checkReservation(room, checkIn, checkOut))
                .filter(room -> reservationFilter.checkRoomOffer(room, checkIn, checkOut))
                .collect(Collectors.toList());
    }

    public Room getRoomBySearch(Long roomId, String accommodationName, String cityName, LocalDate checkIn, LocalDate checkOut) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new EntityNotFoundException("room not found"));

        boolean checkRoomOfferAvailability = reservationFilter.checkRoomOffer(room, checkIn, checkOut) ||
                room.getRoom_offers().stream().anyMatch(roomOffer -> roomOffer.getDate_from().equals(checkIn) && roomOffer.getDate_to().equals(checkOut) && roomOffer.getAvailable());

        if (room.getAccommodation().getName().equals(accommodationName) &&
                room.getAccommodation().getCity().getName().equals(cityName) &&
                reservationFilter.checkReservation(room, checkIn, checkOut) &&
                checkRoomOfferAvailability
        ) {
            return room;
        } else {
            throw new EntityNotFoundException("room not found");
        }
    }

    public Integer getRoomDiscountByCheckInAndCheckOut(Long roomId, LocalDate checkIn, LocalDate checkOut) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new EntityNotFoundException("room not found"));
        RoomOffer roomOffer = room.getRoom_offers().stream()
                .filter(offer -> offer.getDate_from().equals(checkIn) && offer.getDate_to().equals(checkOut))
                .findFirst()
                .orElse(null);
        return roomOffer != null ? roomOffer.getDiscount().getValue() : 0;
    }

    public List<Room> getRoomByAccommodationId(Long accommodationId) {
        return roomRepository.findAllByAccommodation_Id(accommodationId);
    }

    public Room getRoomById(Long id) {
        return roomRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("room not found"));
    }

    public Response updateRoom(RoomDTO updatedRoom, Long roomId) {
        Room currentRoom = roomRepository.findById(roomId).orElseThrow(() -> new EntityNotFoundException("room not found"));
        currentRoom.setRoom_facilities(updatedRoom.room_facilities());
        currentRoom.setPrice(updatedRoom.price());
        currentRoom.setType(updatedRoom.type());
        roomRepository.save(currentRoom);
        return Response.builder().content("Room updated successfully").type("success").build();
    }

    public Response addRoom(RoomDTO roomDTO, Long accommodationId) {
        Accommodation accommodation = accommodationRepository.findById(accommodationId).orElseThrow(() -> new EntityNotFoundException("Accommodation not found"));
        if (accommodation.getRooms().size() != accommodation.getCapacity()) {
            Room room = Room.builder()
                    .type(roomDTO.type())
                    .price(roomDTO.price())
                    .room_facilities(roomDTO.room_facilities())
                    .accommodation(accommodation)
                    .build();
            return Response.builder().content("Room added successfully").type("success").object(roomRepository.save(room)).build();
        } else {
            return Response.builder().content("Accommodation capacity is full").type("warning").build();
        }
    }

    public Response uploadRoomImage(Long id, MultipartFile file, int fileIndex) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("room not found"));
        String imageValue = "image-" + fileIndex + "-room-" + id;
        try {
            s3Service.putObject(
                    bucketName,
                    "images/accommodations/accommodation-" + room.getAccommodation().getId() + "/rooms/room-" + id + "/" + imageValue,
                    file.getBytes());
            if (imageRepository.getImageByValue(imageValue).isEmpty()) {
                Image image = Image.builder().value(imageValue).room(room).build();
                imageRepository.save(image);
            }
            return Response.builder().content("room image added successfully").type("success").build();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public byte[] getRoomImage(Long id, int fileIndex){
        Room room = roomRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("room not found"));
        return s3Service.getObject(
                bucketName,
                "images/accommodations/accommodation-" + room.getAccommodation().getId() + "/rooms/room-" + id + "/image-" + fileIndex + "-room-" + id);
    }
}
