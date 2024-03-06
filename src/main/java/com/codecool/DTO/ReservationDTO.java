package com.codecool.DTO;

import java.time.LocalDate;

public record ReservationDTO(
//        Long id,
        LocalDate check_in,
        LocalDate check_out,
        String email,
        String phoneNumber,
        String name,
        String country,
        String county,
        String city,
        Integer amount,
        Boolean bought,
        Long userId,
        Long roomId,
        String travelType
) {
}
