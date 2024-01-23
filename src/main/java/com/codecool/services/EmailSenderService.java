package com.codecool.services;

import com.codecool.model.Email;
import com.codecool.model.MailExpiration;
import com.codecool.model.user.User;
import com.codecool.repositories.MailExpirationRepository;
import com.codecool.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class EmailSenderService {
    private final JavaMailSender javaMailSender;
    private UserRepository userRepository;
    private MailExpirationRepository mailExpirationRepository;

    @Value("${spring.mail.username}")
    private String sender;

    public EmailSenderService(JavaMailSender javaMailSender, UserRepository userRepository, MailExpirationRepository mailExpirationRepository) {
        this.javaMailSender = javaMailSender;
        this.userRepository = userRepository;;
        this.mailExpirationRepository = mailExpirationRepository;
    }

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
        mailMessage.setText("Visit this link to reset your password: http://localhost:3000/forgotpassword/" + uuid);

        mailExpirationRepository.save(mailExpiration);
        javaMailSender.send(mailMessage);
    }
}
