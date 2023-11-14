package com.codecool.controller;

import com.codecool.model.ContactUs;
import com.codecool.services.ContactUsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/travel/api/contactus")
public class ContactUsController {
    private ContactUsService contactUsService;

    public ContactUsController(ContactUsService contactUsService) {
        this.contactUsService = contactUsService;
    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public void addMessage (@RequestBody ContactUs contactUs) {
        contactUsService.addMessage(contactUs);
    }
}
