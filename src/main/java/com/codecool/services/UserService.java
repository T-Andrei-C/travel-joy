package com.codecool.services;

import com.codecool.model.MailExpiration;
import com.codecool.model.user.ChangePassword;
import com.codecool.model.user.ForgotPassword;
import com.codecool.model.user.UpdateUserName;
import com.codecool.model.user.User;
import com.codecool.repositories.MailExpirationRepository;
import com.codecool.repositories.UserRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailExpirationRepository mailExpirationRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, MailExpirationRepository mailExpirationRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailExpirationRepository = mailExpirationRepository;
    }

    public void changePassword(ChangePassword changePassword, Principal connectedUser) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        if (!passwordEncoder.matches(changePassword.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password!");
        }
        if (!changePassword.getNewPassword().equals(changePassword.getConfirmNewPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        user.setPassword(passwordEncoder.encode(changePassword.getNewPassword()));
        userRepository.save(user);
    }

    public void forgotPassword(ForgotPassword forgotPassword) {
        User user = userRepository.findByEmail(forgotPassword.getEmail()).orElseThrow(() -> new IllegalStateException("User does not exists"));

        if (!forgotPassword.getNewPassword().equals(forgotPassword.getConfirmNewPassword())) {
            throw new IllegalStateException("Password are not the same");
        }
        user.setPassword(passwordEncoder.encode(forgotPassword.getNewPassword()));
        userRepository.save(user);
        MailExpiration mailExpiration = mailExpirationRepository.findMailExpirationByUuid(forgotPassword.getUuid()).orElseThrow(() -> new IllegalStateException("Mail expiration does not exist"));
        mailExpiration.setIsClosed(true);
        mailExpirationRepository.save(mailExpiration);
    }

    public User getAuthUser(Principal connectedUser) {
        return (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
    }

    public void disableUserAccount(Principal connectedUser) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        user.setIsEnabled(false);
        userRepository.save(user);
    }

    public void updateUserName(UpdateUserName updateUserName) {
        System.out.println(updateUserName.getLastName());
        System.out.println(updateUserName.getFirstName());
        System.out.println(updateUserName.getEmail());
        User user = userRepository.findByEmail(updateUserName.getEmail()).orElseThrow(() -> new IllegalStateException("User does not exists"));
        user.setLastname(updateUserName.getLastName());
        user.setFirstname(updateUserName.getFirstName());
        userRepository.save(user);
    }
}
