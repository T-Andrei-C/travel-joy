package com.codecool.model;

import com.codecool.model.enums.RoomType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer capacity;
    private RoomType type;
    private Long price;

    @OneToMany
    @JoinTable(
            name = "room_images",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "image_id")
    )
    private List<Image> images_url;

    @JsonIgnore
    @ManyToOne
    private Accommodation accommodation;

    @ManyToMany
    @JoinTable(
            name = "facilities_for_room",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "facility_id")
    )
    private Set<RoomFacility> room_facilities;

    @JsonIgnore
    @OneToMany(mappedBy = "room")
    private List<Reservation> reservations;
}
