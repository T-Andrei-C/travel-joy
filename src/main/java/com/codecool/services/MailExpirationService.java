package com.codecool.services;

import com.codecool.model.MailExpiration;
import com.codecool.repositories.MailExpirationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class MailExpirationService {

    private MailExpirationRepository mailExpirationRepository;

    public MailExpirationService(MailExpirationRepository mailExpirationRepository) {
        this.mailExpirationRepository = mailExpirationRepository;
    }

    public MailExpiration getMailExpiration (UUID uuid) {
        MailExpiration mailExpiration = mailExpirationRepository.findMailExpirationByUuid(uuid).orElseThrow(() -> new EntityNotFoundException("mail expiration not found"));
        LocalDateTime currentDate = LocalDateTime.now();

        if (mailExpiration.getCreateDate().plusMinutes(15).isAfter(currentDate) && !mailExpiration.getIsClosed()) {
            return mailExpiration;
        } else {
            mailExpiration.setIsClosed(true);
            mailExpirationRepository.save(mailExpiration);
            throw new EntityNotFoundException("mail expired");
        }
    }
}
