package com.codecool.controller;

import com.codecool.model.MailExpiration;
import com.codecool.services.MailExpirationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/travel/api/forgotpassword")
public class MailExpirationController {

    private MailExpirationService mailExpirationService;

    public MailExpirationController(MailExpirationService mailExpirationService) {
        this.mailExpirationService = mailExpirationService;
    }

    @GetMapping("/{uuid}")
    public MailExpiration getMailExpiration (@PathVariable UUID uuid){
        return mailExpirationService.getMailExpiration(uuid);
    }
}
