package com.codecool.configurations;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf((csrf) -> csrf.disable()) // configure csrf
                .authorizeHttpRequests(request -> request
                        .requestMatchers(
                                "/travel/api/accommodation/facilities/**",
                                "/travel/api/countries/**",
                                "/travel/api/discounts/**",
                                "/travel/api/room/facilities/**",
                                "/travel/api/roomOfferTypes/**",
                                "/travel/api/roomTypes/**"
                        ).hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET,
                                "/travel/api/accommodations",
                                "/travel/api/carousel/images/{id}",
                                "/travel/api/carousel/images/",
                                "/travel/api/rooms/{accommodationId}",
                                "/travel/api/rooms/room/{id}",
                                "/travel/api/roomOffers/room/{roomId}",
                                "/travel/api/roomOffers/offer/{id}",
                                "/travel/api/roomOffers/offer/available/{id}"
                        ).hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE,
                                "/travel/api/carousel/images/{id}",
                                "/travel/api/cities/{id}",
                                "/travel/api/roomOffers/offer/{id}"
                        ).hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,
                                "/travel/api/accommodations",
                                "/travel/api/accommodation/{id}/uploadImage",
                                "/travel/api/carousel/images",
                                "/travel/api/carousel/images/{id}/addImage",
                                "/travel/api/cities",
                                "/travel/api/rooms/accommodation/{accommodationId}/addRoom",
                                "/travel/api/rooms/room/{id}/uploadImage/{fileIndex}",
                                "/travel/api/rooms/room/{id}/disableOrEnable",
                                "/travel/api/roomOffers/room/{roomId}/addOffer"
                        ).hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH,
                                "/travel/api/accommodation/{id}/disableOrEnable",
                                "/travel/api/accommodation/{id}",
                                "/travel/api/carousel/images{id}",
                                "/travel/api/cities/{id}",
                                "/travel/api/rooms/room/{id}"
                        ).hasRole("ADMIN")
                        .requestMatchers(
                                "/travel/api/payment/**",
                                "/travel/api/rating/add/{ratingValue}/{reservationId}",
                                "/travel/api/rating/{reservationId}",
                                "/travel/api/rating/isRated/{reservationId}",
                                "/travel/api/rating/canRate/{reservationId}",
                                "/travel/api/rating/isRatingPresent/{reservationId}",
                                "/travel/api/reservations/**",
                                "/travel/api/rooms/room/{roomId}/{accommodationName}/{cityName}/{checkIn}/{checkOut}",
                                "/travel/api/rooms/discount/{roomId}/{checkIn}/{checkOut}",
                                "/travel/api/users/changePassword",
                                "/travel/api/users/getUser",
                                "/travel/api/users/disableAccount",
                                "/travel/api/users/updateUserName"
                        ).authenticated()
                        .requestMatchers(
                                "/travel/api/auth/**",
                                "/travel/api/accommodations/{id}",
                                "/travel/api/accommodations/accommodation/{id}/image",
                                "/travel/api/accommodations/{itemsPerPage}/{numberOfPage}",
                                "/travel/api/accommodations/{cityName}/{itemsPerPage}/{numberOfPage}",
                                "/travel/api/accommodations/{cityName}/{checkIn}/{checkOut}/{numberOfPersons}/{itemsPerPage}/{numberOfPage}",
                                "/travel/api/accommodations/accommodation/{id}/{checkIn}/{checkOut}/verify",
                                "/travel/api/carousel/images",
                                "/travel/api/carousel/images/{id}/getImage",
                                "/travel/api/cities",
                                "/travel/api/contactus",
                                "/travel/api/email",
                                "/travel/api/forgotpassword/**",
                                "/travel/api/rating/accommodation/{id}",
                                "/travel/api/rooms/available/{accommodationName}/{cityName}/{checkIn}/{checkOut}/{capacity}",
                                "/travel/api/rooms/room/{id}/{checkIn}/{checkOut}/verify",
                                "/travel/api/rooms/room/{id}/image/{fileIndex}",
                                "/travel/api/users/forgotpassword",
                                "/travel/api/roomOffers/{itemsPerPage}/{numberOfPage}",
                                "/travel/api/roomOffers/{cityName}/{itemsPerPage}/{numberOfPage}",
                                "/travel/api/roomOffers/{cityName}/{checkIn}/{checkOut}/{numberOfPersons}/{itemsPerPage}/{numberOfPage}",
                                "/travel/api/roomOffers/offer/{id}/verify"
                        ).permitAll()
                )
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .cors(cors -> cors.configure(http))
        ;
        return http.build();
    }
}
