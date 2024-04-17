package com.codecool.controller;

import com.codecool.model.Email;
import com.codecool.services.EmailSenderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/email")
public class EmailSenderController {
    private final EmailSenderService emailSenderService;

    @PostMapping
    public void sendEmailForForgotPassword (@RequestBody Email email){
        emailSenderService.sendEmailForForgotPassword(email);
    }
}
