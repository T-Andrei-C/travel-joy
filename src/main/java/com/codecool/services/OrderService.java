package com.codecool.services;

import com.codecool.model.payment.Order;
import com.codecool.repositories.OrderRepository;
import com.codecool.repositories.ReservationRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    private OrderRepository orderRepository;
    private ReservationRepository reservationRepository;

    public OrderService(OrderRepository orderRepository, ReservationRepository reservationRepository) {
        this.orderRepository = orderRepository;
        this.reservationRepository =  reservationRepository;
    }

    public void createOrder (Order order) {
        reservationRepository.save(order.getReservation());
        orderRepository.save(order);
    }
}
