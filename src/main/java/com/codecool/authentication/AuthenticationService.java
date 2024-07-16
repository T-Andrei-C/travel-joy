package com.codecool.authentication;

import com.codecool.configurations.JwtService;
import com.codecool.model.user.User;
import com.codecool.repositories.RoleRepository;
import com.codecool.repositories.UserRepository;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).orElse(null) != null){
            return AuthenticationResponse.builder()
                    .response("Email already in use.")
                    .type("danger")
                    .build();
        }

        if (request.getPassword().length() < 6){
            return AuthenticationResponse.builder()
                    .response("Password must be at least 6 characters.")
                    .type("danger")
                    .build();
        }

        User user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(roleRepository.findByName("ROLE_USER"))
                .isEnabled(true)
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .type("success")
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticateRequest request){
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            var user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow();
            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        } catch (BadCredentialsException e){
            return AuthenticationResponse.builder()
                    .response("Email or password are invalid. ")
                    .type("danger")
                    .build();
        }
    }
}
