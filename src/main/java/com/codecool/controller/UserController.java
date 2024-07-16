package com.codecool.controller;

import com.codecool.model.MailExpiration;
import com.codecool.model.Response;
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

    @PatchMapping("changePassword")
    public Response changePassword(@RequestBody ChangePassword request, Principal connectedUser) {
        return userService.changePassword(request, connectedUser);
    }

    @PatchMapping("/forgotpassword")
    public Response forgotPassword(@RequestBody ForgotPassword forgotPassword){
        return userService.forgotPassword(forgotPassword);
    }

    @GetMapping("getUser")
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
