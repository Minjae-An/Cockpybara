package Alchole_free.Cockpybara.domain;

import Alchole_free.Cockpybara.controller.member.constant.RegexConstant;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.sql.Date;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
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


    public Member(String email, String password, String alias, String phoneNumber, Gender gender, Date birth) {
        this.email = email;
        this.password = password;
        this.alias = alias;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.birth = birth;
    }
}
