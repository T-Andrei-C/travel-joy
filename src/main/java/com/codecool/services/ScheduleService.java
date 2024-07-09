package com.codecool.services;

import com.codecool.model.Reservation;
import com.codecool.model.room.RoomOffer;
import com.codecool.model.user.User;
import com.codecool.repositories.ReservationRepository;
import com.codecool.repositories.RoomOfferRepository;
import com.codecool.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDate;
import java.util.List;

@Configuration
@EnableScheduling
@RequiredArgsConstructor
public class ScheduleService {

    private final RoomOfferRepository roomOfferRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    @Scheduled(fixedRate = 600000)
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

    @Scheduled(fixedRate = 86400000)
    public void sendEmailForRatingReservation () {
        List<Reservation> reservations = reservationRepository.findAll();
        LocalDate today = LocalDate.now();

        for (Reservation reservation : reservations){
            User user = userRepository.findById(reservation.getUser().getId()).orElseThrow(() -> new EntityNotFoundException("user not found"));

            if (reservation.getCheck_out().isBefore(today)){
                if (!reservation.getSendEmailForRating()){

                    SimpleMailMessage mailMessage = new SimpleMailMessage();
                    mailMessage.setFrom("Travel Joy<" + sender + ">");
                    mailMessage.setTo(user.getEmail());
                    mailMessage.setSubject("Rating your stay");
                    mailMessage.setText("Access the following link to give a rating between 1 to 5 stars\nhttp://localhost:3000/myOrders/rating/" + reservation.getId());
                    javaMailSender.send(mailMessage);

                    reservation.setSendEmailForRating(true);
                    reservationRepository.save(reservation);
                }
            }
        }
    }
}
