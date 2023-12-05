package com.codecool.model.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ForgotPassword {
    private String email;
    private String newPassword;
    private String confirmNewPassword;
}
