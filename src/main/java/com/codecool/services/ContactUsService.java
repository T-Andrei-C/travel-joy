package com.codecool.services;

import com.codecool.model.ContactUs;
import com.codecool.repositories.ContactUsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ContactUsService {
    private final ContactUsRepository contactUsRepository;

    public void addMessage (ContactUs contactUs) {
        contactUsRepository.save(contactUs);
    }
}
