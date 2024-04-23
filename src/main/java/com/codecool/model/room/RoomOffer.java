package com.codecool.model.room;

import com.codecool.model.Discount;
import com.codecool.model.room.enums.RoomOfferType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "room_offers")
public class RoomOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Discount discount;

    private RoomOfferType roomOfferType;
    private LocalDate date_from;
    private LocalDate date_to;
    private Boolean available;

    @ManyToOne
    private Room room;
}
