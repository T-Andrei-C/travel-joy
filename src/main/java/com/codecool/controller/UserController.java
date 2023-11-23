package com.codecool.controller;

import com.codecool.model.user.ChangePassword;
import com.codecool.model.user.User;
import com.codecool.services.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@Controller
@RequestMapping("/travel/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PatchMapping
    public void changePassword(@RequestBody ChangePassword request, Principal connectedUser){
        userService.changePassword(request,connectedUser);
    }

    @GetMapping
    public User getAuthUser(Principal connectedUser){
        return userService.getAuthUser(connectedUser);
    }
}
