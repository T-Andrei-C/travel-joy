//package com.codecool.model;
//
//import lombok.*;
//
//import javax.persistence.*;
//
//@Getter
//@Setter
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
//@Entity
//@Table(name = "cities")
//public class City {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long city_id;
//
//    private String name;
//
//    @ManyToOne
//    @JoinColumn(name = "country_id")
//    private Country country;
//
//}
