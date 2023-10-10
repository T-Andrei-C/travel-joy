package com.codecool.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(request ->
                    request.requestMatchers("http://localhost:3000/login").permitAll()
                            .requestMatchers("/travel/api/accommodations/3/0").authenticated()
                            .requestMatchers("/travel/api/**").permitAll()
                )
                .formLogin(login -> login.loginPage("http://localhost:3000/login").permitAll()
                        .defaultSuccessUrl("http://localhost:3000/"))
                .build();
    }
}
