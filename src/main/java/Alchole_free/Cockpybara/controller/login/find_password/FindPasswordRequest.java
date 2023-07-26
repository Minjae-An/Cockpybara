package Alchole_free.Cockpybara.controller.login.find_password;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import static Alchole_free.Cockpybara.constant.RegexConstant.*;

@Data
public class FindPasswordRequest {
    @NotNull
    @Pattern(regexp = EMAIL_REGEX, message = "잘못된 이메일 형식입니다.")
    private String email;

    @NotNull
    @Pattern(regexp = ALIAS_REGEX, message = "잘못된 별명 형식입니다.")
    private String alias;

    @NotNull
    @Pattern(regexp = PHONE_NUMBER_REGEX, message = "잘못된 번호 형식입니다.")
    private String phoneNumber;
}
