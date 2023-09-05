package com.codecool.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "accommodations")
public class Accommodation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    private City city;

    @ManyToOne
    private Country country;

    @OneToMany(mappedBy = "accommodation")
    private List<Room> rooms;

    @ManyToMany
    @JoinTable(
            name = "facilities_for_accomodation",
            joinColumns = @JoinColumn(name = "accomodation_id"),
            inverseJoinColumns = @JoinColumn(name = "facility_id")
    )
    private List<AccommodationFacility> accommodation_services;


}
