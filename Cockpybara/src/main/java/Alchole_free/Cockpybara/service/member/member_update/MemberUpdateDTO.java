package Alchole_free.Cockpybara.service.member.member_update;

import Alchole_free.Cockpybara.domain.member.Gender;
import Alchole_free.Cockpybara.domain.member.Member;
import lombok.Data;

import java.sql.Date;

@Data
public class MemberUpdateDTO {
    private String email;
    private String password;
    private String alias;
    private String phoneNumber;
    private Gender gender;
    private Date birth;
    private String imageUrl;

    public MemberUpdateDTO from(Member member){
        this.email=member.getEmail();
        this.password=member.getPassword();
        this.alias=member.getAlias();
        this.phoneNumber=member.getPhoneNumber();
        this.gender=member.getGender();
        this.birth=member.getBirth();
        this.imageUrl=member.getImageUrl();

        return this;
    }
}
