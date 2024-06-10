package com.codecool.services;

import com.codecool.model.Discount;
import com.codecool.model.Response;
import com.codecool.model.room.RoomOfferType;
import com.codecool.repositories.DiscountRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DiscountService {
    private final DiscountRepository discountRepository;

    public List<Discount> getAllDiscounts() {
        return discountRepository.findAll();
    }

    public Response updateDiscount(Long id, Discount updatedDiscount) {
        Discount discount = discountRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("discount not found"));
        if (updatedDiscount.getValue() > 1 && updatedDiscount.getValue() <= 90) {
            if (discountRepository.findAll().stream().noneMatch(d -> d.getValue().equals(updatedDiscount.getValue()))) {
                discount.setValue(updatedDiscount.getValue());
                discountRepository.save(discount);
                return Response.builder().content("discount updated").type("success").build();
            } else {
                return Response.builder().content("discount with the value " + updatedDiscount.getValue() + "% already exists").type("danger").build();
            }
        } else {
            return Response.builder().content("discount value has to be between 2% and 90%").type("danger").build();
        }
    }

    public Response deleteDiscount(Long id) {
        Discount discount = discountRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("discount not found"));
        try {
            discountRepository.delete(discount);
            return Response.builder().content("discount deleted").type("success").build();
        } catch (Exception e) {
            return Response.builder().content("discount is in use and can't be deleted").type("danger").build();
        }
    }

    public Response addDiscount(Discount discount) {
        if (discount.getValue() > 1 && discount.getValue() <= 90) {
            if (discountRepository.findAll().stream().noneMatch(d -> d.getValue().equals(discount.getValue()))) {
                discountRepository.save(discount);
                return Response.builder().content("discount added").type("success").build();
            } else {
                return Response.builder().content("discount with the value " + discount.getValue() + "% already exists").type("danger").build();
            }
        } else {
            return Response.builder().content("discount value has to be between 2% and 90%").type("danger").build();
        }
    }

}
