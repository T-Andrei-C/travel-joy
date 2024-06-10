package com.codecool.controller;

import com.codecool.model.Discount;
import com.codecool.model.Response;
import com.codecool.model.room.RoomOfferType;
import com.codecool.services.DiscountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/discounts")
public class DiscountController {
    private final DiscountService discountService;

    @GetMapping
    public List<Discount> getAllDiscounts() {
        return discountService.getAllDiscounts();
    }

    @PatchMapping("{id}")
    public Response updateDiscount(@PathVariable Long id, @RequestBody Discount updatedDiscount){
        return discountService.updateDiscount(id, updatedDiscount);
    }

    @DeleteMapping("{id}")
    public Response deleteDiscount(@PathVariable Long id){
        return discountService.deleteDiscount(id);
    }

    @PostMapping
    public Response addDiscount(@RequestBody Discount discount){
        return discountService.addDiscount(discount);
    }

}
