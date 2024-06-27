package com.codecool.services;

import com.codecool.configurations.aws.S3Service;
import com.codecool.model.Accommodation;
import com.codecool.model.CarouselImage;
import com.codecool.model.City;
import com.codecool.model.Response;
import com.codecool.repositories.CarouselImageRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CarouselImageService {

    @Value("${bucket.name}")
    private String bucketName;

    private final CarouselImageRepository carouselImageRepository;
    private final S3Service s3Service;

    public List<CarouselImage> getAllCarouselImages() {
        return carouselImageRepository.findAll();
    }

    public Response addCarouselImage(@Nullable City city){
        System.out.println(city);
        CarouselImage carouselImage = CarouselImage.builder().city(city).build();
        return Response.builder().content("Carousel image added successfully").type("success").object(carouselImageRepository.save(carouselImage)).build();
    }

    public Response updateCarouselImage(Long id, @Nullable City city){
        CarouselImage carouselImage = carouselImageRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("carousel image not found"));
        carouselImage.setCity(city);
        carouselImageRepository.save(carouselImage);
        return Response.builder().content("Carousel image updated successfully").type("success").build();
    }

    public Response deleteCarouselImage(Long id){
        CarouselImage carouselImage = carouselImageRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("carousel image not found"));
        s3Service.deleteObject(bucketName, "images/carousel/" + carouselImage.getImage_value());
        carouselImageRepository.delete(carouselImage);
        return Response.builder().content("Carousel image deleted successfully").type("success").build();
    }

    public Response uploadImageForCarousel(Long id, MultipartFile file) {
        CarouselImage carouselImage = carouselImageRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("carousel image not found"));
        String imageValue = "image-" + id;

        try {
            s3Service.putObject(bucketName, "images/carousel/" + imageValue, file.getBytes());

            if (carouselImage.getImage_value() == null) {
                carouselImage.setImage_value(imageValue);
                carouselImageRepository.save(carouselImage);
            }
            return Response.builder().content("Image for carousel added successfully").type("success").build();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public byte[] getImageForCarousel(Long id) {
        CarouselImage carouselImage = carouselImageRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("carousel image not found"));
        return s3Service.getObject(bucketName, "images/carousel/" + carouselImage.getImage_value());
    }
}
