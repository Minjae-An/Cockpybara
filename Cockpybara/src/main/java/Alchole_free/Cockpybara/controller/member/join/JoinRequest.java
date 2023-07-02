package Alchole_free.Cockpybara.controller.member.join;


import Alchole_free.Cockpybara.domain.Gender;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JoinRequest {
    private String email;
    private String password;
    private String alias;
    private String phoneNumber;
    private Gender gender;
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
