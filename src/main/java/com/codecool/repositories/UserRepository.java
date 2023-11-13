package com.codecool.repositories;

import com.codecool.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
//    boolean existsByLastnameAndFirstname(String lastname,String firstname);
//    boolean existsByEmail(String email);
}
