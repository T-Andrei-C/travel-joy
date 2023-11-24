package com.codecool.services;

import com.codecool.model.user.ChangePassword;
import com.codecool.model.user.User;
import com.codecool.repositories.UserRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void changePassword(ChangePassword changePassword, Principal connectedUser){
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        if(!passwordEncoder.matches(changePassword.getCurrentPassword(),user.getPassword())){
            throw new IllegalStateException("Wrong password!");
        }
        if(!changePassword.getNewPassword().equals(changePassword.getConfirmNewPassword())){
            throw new IllegalStateException("Password are not the same");
        }

        user.setPassword(passwordEncoder.encode(changePassword.getNewPassword()));
        userRepository.save(user);
    }

    public Principal getAuthUser(Principal connectedUser){
        return connectedUser;
    }
}
