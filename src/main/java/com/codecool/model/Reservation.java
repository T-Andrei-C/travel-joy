package com.codecool.model;

import com.codecool.model.user.User;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "reservations")
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "id")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate check_in;
    private LocalDate check_out;

    private String email;
    private String phoneNumber;
    private String name;

    private String country;
    private String county;
    private String city;
    private String address;
    private Integer amount;

    @ManyToOne
    private User user;

    @ManyToOne
    private Room room;
}
