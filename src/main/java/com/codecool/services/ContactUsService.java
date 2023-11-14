package com.codecool.services;

import com.codecool.model.ContactUs;
import com.codecool.repositories.ContactUsRepository;
import org.springframework.stereotype.Service;

@Service
public class ContactUsService {
    private ContactUsRepository contactUsRepository;

    public ContactUsService(ContactUsRepository contactUsRepository) {
        this.contactUsRepository = contactUsRepository;
    }

    public void addMessage (ContactUs contactUs) {
        contactUsRepository.save(contactUs);
    }
}
