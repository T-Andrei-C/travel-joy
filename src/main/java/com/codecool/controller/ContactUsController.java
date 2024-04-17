package com.codecool.controller;

import com.codecool.model.ContactUs;
import com.codecool.services.ContactUsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/contactus")
public class ContactUsController {
    private final ContactUsService contactUsService;

    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public void addMessage (@RequestBody ContactUs contactUs) {
        contactUsService.addMessage(contactUs);
    }
}
