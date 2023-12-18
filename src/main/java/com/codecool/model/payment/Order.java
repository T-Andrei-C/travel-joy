package com.codecool.model.payment;

import com.codecool.model.Reservation;
import com.codecool.model.user.User;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {

    @Id
    private Long id;

    private String email;
    private String phoneNumber;
    private String name;

    private String country;
    private String county;
    private String city;
    private String address;

    private Integer amount;

    @OneToOne
    private Reservation reservation;

    @ManyToOne
    private User user;
}
