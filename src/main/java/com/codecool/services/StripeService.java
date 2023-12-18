package com.codecool.services;

import com.codecool.model.payment.Order;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.stereotype.Service;

@Service
public class StripeService {
//    @Value("${stripe.keys.secret}")
//    private String API_SECRET_KEY;
    public String createCharge(Order payment) {
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
