package com.codecool.controller;

import com.codecool.model.Reservation;
import com.codecool.model.payment.Key;
import com.codecool.services.StripeService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/travel/api/payment")
public class PaymentController {
    private StripeService stripeService;

    @Value("${stripe.keys.public}")
    private String API_PUBLIC_KEY;
    public PaymentController(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @GetMapping
    public Key getPublicKey (){
        return Key.builder().key(API_PUBLIC_KEY).build();
    }

    @PostMapping
    public Key createPayment (@RequestBody Reservation payment){
        return Key.builder().key(stripeService.createCharge(payment)).build();
    }
}
