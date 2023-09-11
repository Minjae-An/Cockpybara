package Alchole_free.Cockpybara.controller.login;


import Alchole_free.Cockpybara.constant.RegexConstant;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import static Alchole_free.Cockpybara.constant.RegexConstant.EMAIL_REGEX;
import static Alchole_free.Cockpybara.constant.RegexConstant.PASSWORD_REGEX;

@Data
public class LoginRequest {
    @NotNull
    @Pattern(regexp = EMAIL_REGEX, message = "잘못된 이메일 형식입니다.")
    private String email;

    @NotNull
    @Pattern(regexp = PASSWORD_REGEX, message = "잘못된 비밀번호 형식입니다.")
    private String password;
}
