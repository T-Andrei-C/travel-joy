package com.codecool.controller;

import com.codecool.model.MailExpiration;
import com.codecool.model.user.ChangePassword;
import com.codecool.model.user.ForgotPassword;
import com.codecool.model.user.UpdateUserName;
import com.codecool.model.user.User;
import com.codecool.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RequiredArgsConstructor
@RestController
@RequestMapping("/travel/api/users")
public class UserController {

    private final UserService userService;

    @PatchMapping
    public ResponseEntity<String> changePassword(@RequestBody ChangePassword request, Principal connectedUser) {
        userService.changePassword(request, connectedUser);
        return ResponseEntity.ok("{}");
    }

    @PatchMapping("/forgotpassword")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPassword forgotPassword){
        userService.forgotPassword(forgotPassword);
        return ResponseEntity.ok("{}");
    }

    @GetMapping
    @CrossOrigin(origins = "*")
    public User getAuthUser(Principal connectedUser) {
        return userService.getAuthUser(connectedUser);
    }

    @PatchMapping("/disableAccount")
    public void disableUserAccount(Principal connectedUser){
        userService.disableUserAccount(connectedUser);
    }

    @PatchMapping("/updateUserName")
    public void updateUserName(@RequestBody UpdateUserName updateUserName){
        userService.updateUserName(updateUserName);
    }
}
