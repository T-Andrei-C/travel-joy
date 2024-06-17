package com.codecool.model;

import com.codecool.model.room.Room;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Data
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
    private Integer capacity;
    private String description;
    private Double rating;

    private String image_value;

    @ManyToOne
    private City city;

    @JsonBackReference
    @OneToMany(mappedBy = "accommodation")
    private List<Room> rooms;

    @ManyToMany
    @JoinTable(
            name = "facilities_for_accomodation",
            joinColumns = @JoinColumn(name = "accommodation_id"),
            inverseJoinColumns = @JoinColumn(name = "facility_id")
    )
    private Set<AccommodationFacility> accommodation_facilities;
}
