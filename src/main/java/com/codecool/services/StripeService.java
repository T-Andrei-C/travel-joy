package com.codecool.services;

import com.codecool.model.payment.Amount;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeService {
    @Value("${stripe.keys.secret}")
    private String API_SECRET_KEY;

    public String createCharge(Amount payment) {
        Stripe.apiKey = API_SECRET_KEY;

        try {
            PaymentIntentCreateParams createParams = new PaymentIntentCreateParams.Builder()
                    .setCurrency("ron")
                    .setAmount((long) payment.getAmount())
                    .build();

            PaymentIntent paymentIntent = PaymentIntent.create(createParams);

            return paymentIntent.getClientSecret();
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
