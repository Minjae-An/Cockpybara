package Alchole_free.Cockpybara.controller.login.set_new_password;

import Alchole_free.Cockpybara.constant.RegexConstant;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
public class SetNewPasswordRequest {
    @NotNull
    @Pattern(regexp = RegexConstant.EMAIL_REGEX, message = "잘못된 이메일 형식입니다.")
    private String email;

    @NotNull
    @Pattern(regexp = RegexConstant.PASSWORD_REGEX, message = "잘못된 비밀번호 형식입니다.")
    private String password;
}
