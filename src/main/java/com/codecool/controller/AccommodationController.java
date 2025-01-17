package com.codecool.controller;

import com.codecool.DTO.AccommodationDTO;
import com.codecool.model.Accommodation;
import com.codecool.model.Response;
import com.codecool.services.AccommodationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/accommodations")
public class AccommodationController {
    private final AccommodationService accommodationService;

    @GetMapping
    public List<Accommodation> getAllAccommodations() {
        return accommodationService.getAllAccommodations();
    }

    @GetMapping("/{id}")
    public Accommodation getAccommodationById(@PathVariable Long id) {
        return accommodationService.getAccommodationById(id);
    }

    @GetMapping("/{itemsPerPage}/{numberOfPage}")
    public Page<Accommodation> getAccommodationPerPage(@PathVariable int itemsPerPage, @PathVariable int numberOfPage) {
        return accommodationService.getAccommodationPerPage(numberOfPage, itemsPerPage);
    }

    @GetMapping("/{cityName}/{itemsPerPage}/{numberOfPage}")
    public Page<Accommodation> getAccommodationByCity(@PathVariable String cityName, @PathVariable int itemsPerPage, @PathVariable int numberOfPage) {
        return accommodationService.getAllAccommodationsByCity(numberOfPage, itemsPerPage, cityName);
    }

    @GetMapping("/{cityName}/{checkIn}/{checkOut}/{numberOfPersons}/{itemsPerPage}/{numberOfPage}")
    public Page<Accommodation> getAccommodationsSearch(@PathVariable String cityName,
                                                       @PathVariable LocalDate checkIn,
                                                       @PathVariable LocalDate checkOut,
                                                       @PathVariable Integer numberOfPersons,
                                                       @PathVariable int itemsPerPage,
                                                       @PathVariable int numberOfPage) {
        return accommodationService.accommodationSearch(numberOfPage, itemsPerPage, cityName, checkIn, checkOut, numberOfPersons);
    }

    @PostMapping
    public Response addAccommodation(@RequestBody AccommodationDTO accommodationDTO) {
        return accommodationService.addAccommodation(accommodationDTO);
    }

    @PatchMapping("accommodation/{id}/disableOrEnable")
    public Response disableOrEnableAccommodation(@PathVariable Long id){
        return accommodationService.disableOrEnableAccommodation(id);
    }

    @PatchMapping("accommodation/{id}")
    public Response updateAccommodation(@PathVariable Long id, @RequestBody AccommodationDTO updatedAccommodation){
        return accommodationService.updateAccommodation(updatedAccommodation, id);
    }

    @GetMapping("accommodation/{id}/{checkIn}/{checkOut}/verify")
    public Response verifyAccommodationAvailability (@PathVariable Long id, @PathVariable LocalDate checkIn, @PathVariable LocalDate checkOut){
        return accommodationService.verifyAccommodationAvailability(id, checkIn, checkOut);
    }

    @PostMapping(
            value = "accommodation/{id}/uploadImage",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public Response uploadAccommodationImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        return accommodationService.uploadAccommodationImage(id, file);
    }

    @GetMapping(
            value = "accommodation/{id}/image",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public byte[] getAccommodationImage(@PathVariable Long id) {
        return accommodationService.getAccommodationImage(id);
    }
}
