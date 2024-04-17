package com.codecool.controller;

import com.codecool.model.payment.Amount;
import com.codecool.model.payment.Key;
import com.codecool.services.StripeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/payment")
public class PaymentController {
    private final StripeService stripeService;

    @Value("${stripe.keys.public}")
    private String API_PUBLIC_KEY;

    @GetMapping
    public Key getPublicKey (){
        return Key.builder().key(API_PUBLIC_KEY).build();
    }

    @PostMapping
    public Key createPayment (@RequestBody Amount payment){
        return Key.builder().key(stripeService.createCharge(payment)).build();
    }
}
