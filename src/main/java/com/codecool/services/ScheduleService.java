package com.codecool.services;

import com.codecool.model.room.RoomOffer;
import com.codecool.repositories.RoomOfferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDate;
import java.util.List;

@Configuration
@EnableScheduling
@RequiredArgsConstructor
public class ScheduleService {

    private final RoomOfferRepository roomOfferRepository;

    @Scheduled(fixedRate = 100000)
    public void checkIfRoomOfferDateExpired () {
        List<RoomOffer> roomOffers = roomOfferRepository.findAll();
        for (RoomOffer roomOffer : roomOffers){
            if (roomOffer.getAvailable()){
                if (roomOffer.getDate_from().isBefore(LocalDate.now())){
                    roomOfferRepository.delete(roomOffer);
                }
            }
        }
    }
}
