package com.codecool.model;

import com.codecool.model.enums.TravelPackageType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "travel_packages")
public class TravelPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer price;

    @ManyToOne
    @JoinColumn
    private Room room;

    private LocalDate checkIn;
    private LocalDate checkOut;

    private TravelPackageType travelPackageType;

    @OneToOne
    private Reservation reservation;

}
