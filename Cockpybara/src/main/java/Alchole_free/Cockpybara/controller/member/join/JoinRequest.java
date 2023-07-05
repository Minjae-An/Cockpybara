package Alchole_free.Cockpybara.controller.member.join;


import Alchole_free.Cockpybara.controller.member.constant.RegexConstant;
import Alchole_free.Cockpybara.domain.Gender;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.sql.Date;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JoinRequest {
    @NotNull
    @Pattern(regexp = RegexConstant.EMAIL_REGEX, message = "잘못된 이메일 형식입니다.")
    private String email;

    @NotNull
    @Size(min=8, max = 15)
    private String password;

    @NotNull
    private String alias;

    @NotNull
    @Pattern(regexp = RegexConstant.PHONE_NUMBER_REGEX, message = "잘못된 번호 형식입니다.")
    private String phoneNumber;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")

    private Date birth;

    public JoinRequest(String email, String password,
                       String alias, String phoneNumber, Gender gender, Date birth) {
        this.email = email;
        this.password = password;
        this.alias = alias;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.birth = birth;
    }
}
