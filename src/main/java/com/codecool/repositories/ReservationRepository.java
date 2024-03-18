package com.codecool.repositories;

import com.codecool.model.Reservation;
import com.codecool.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation,Long> {
    List<Reservation> getReservationsByUserAndBought(User user, boolean bought);
}
