package com.codecool.services;

import com.codecool.model.Email;
import com.codecool.model.MailExpiration;
import com.codecool.model.user.User;
import com.codecool.repositories.MailExpirationRepository;
import com.codecool.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class EmailSenderService {
    private final JavaMailSender javaMailSender;
    private final UserRepository userRepository;
    private final MailExpirationRepository mailExpirationRepository;

    @Value("${spring.mail.username}")
    private String sender;

    public void sendEmailForForgotPassword (Email email) {
        User user = userRepository.findByEmail(email.getRecipient()).orElseThrow(() -> new EntityNotFoundException("User does not exists"));
        UUID uuid = UUID.randomUUID();

        MailExpiration mailExpiration = MailExpiration.builder()
                .createDate(LocalDateTime.now())
                .isClosed(false)
                .user(user)
                .uuid(uuid)
                .build();

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("Travel Joy<" + sender + ">");
        mailMessage.setTo(email.getRecipient());
        mailMessage.setSubject("Forgot Password");
        mailMessage.setText("We have received your request to change your password. For security purposes, please click the link below within the next 15 minutes to complete the process:\nhttp://localhost:3000/forgotpassword/" + uuid);
        mailExpirationRepository.save(mailExpiration);
        javaMailSender.send(mailMessage);
    }
}
