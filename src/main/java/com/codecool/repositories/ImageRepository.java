package com.codecool.repositories;

import com.codecool.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> getImageByValue(String image_url);
}
