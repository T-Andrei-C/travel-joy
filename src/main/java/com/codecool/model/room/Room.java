package com.codecool.model.room;

import com.codecool.model.*;
import com.codecool.model.room.enums.RoomType;
import com.fasterxml.jackson.annotation.*;
import lombok.*;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private RoomType type;
    private Long price;

    @JsonManagedReference
    @ManyToOne
    private Accommodation accommodation;

    @JsonBackReference
    @OneToMany(mappedBy = "room")
    private List<Reservation> reservations;

    @OneToMany
    @JoinTable(
            name = "room_images",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "image_id")
    )
    private List<Image> images_url;

    @ManyToMany
    @JoinTable(
            name = "facilities_for_room",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "facility_id")
    )
    private Set<RoomFacility> room_facilities;

    @JsonIgnore
    @OneToMany(mappedBy = "room")
    private List<RoomOffer> room_offers;
}
