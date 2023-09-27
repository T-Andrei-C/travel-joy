package com.codecool.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "accommodations")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Accommodation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer capacity;
    private String description;

    @OneToOne
    private Image image_url;


    @ManyToOne
    private City city;

//    @JsonManagedReference
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
