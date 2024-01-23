package com.codecool.repositories;

import com.codecool.model.MailExpiration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MailExpirationRepository extends JpaRepository<MailExpiration, Long> {
    Optional<MailExpiration> findMailExpirationByUuid (UUID uuid);
}
