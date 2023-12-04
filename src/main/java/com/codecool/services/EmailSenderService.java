package com.codecool.services;

import com.codecool.model.Email;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    public EmailSenderService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmailForForgotPassword (Email email) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("Travel Joy<" + sender + ">");
        mailMessage.setTo(email.getRecipient());
        mailMessage.setSubject("Forgot Password");
        mailMessage.setText("Visit this link to reset your password: http://localhost:3000/");

        javaMailSender.send(mailMessage);
    }
}
