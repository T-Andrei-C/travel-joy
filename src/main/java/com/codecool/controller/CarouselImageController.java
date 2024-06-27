package com.codecool.controller;

import com.codecool.model.CarouselImage;
import com.codecool.model.City;
import com.codecool.model.Response;
import com.codecool.services.CarouselImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/travel/api/carousel/images")
public class CarouselImageController {

    private final CarouselImageService carouselImageService;

    @GetMapping
    public List<CarouselImage> getAllCarouselImages() {
        return carouselImageService.getAllCarouselImages();
    }

    @PatchMapping("/{id}")
    public Response updateCarouselImage(@PathVariable Long id, @Nullable @RequestBody City city){
        return carouselImageService.updateCarouselImage(id, city);
    }

    @DeleteMapping("/{id}")
    public Response deleteCarouselImage(@PathVariable Long id){
        return carouselImageService.deleteCarouselImage(id);
    }

    @PostMapping
    public Response addCarouselImage(@RequestBody @Nullable City city){
        return carouselImageService.addCarouselImage(city);
    }

    @PostMapping(
            value = "{id}/addImage",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public Response addImageForCarousel(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        return carouselImageService.uploadImageForCarousel(id, file);
    }

    @GetMapping(
            value = "{id}/getImage",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public byte[] getImageForCarousel(@PathVariable Long id) {
        return carouselImageService.getImageForCarousel(id);
    }
}
