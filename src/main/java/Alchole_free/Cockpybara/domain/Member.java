package Alchole_free.Cockpybara.domain;

import Alchole_free.Cockpybara.controller.member.update.MemberInfoUpdateRequest;
import com.sun.istack.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import java.sql.Date;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;

    private String alias;

    private String phoneNumber;
    private Gender gender;
    private Date birth;

    public Member(String email, String password, String alias, String phoneNumber, Gender gender, Date birth) {

    @NotNull
    private String email;
    @NotNull
    private String password;

    @NotNull
    private String alias;

    @NotNull
    private String phoneNumber;

    public Member(String email, String password, String alias, String phoneNumber) {

        this.email = email;
        this.password = password;
        this.alias = alias;
        this.phoneNumber = phoneNumber;

        this.gender = gender;
        this.birth = birth;
    }

    public void updatePassword(String password) {
        this.password = password;
    }
  
   public void updateMember(String alias, String phoneNumber) {
        this.alias = alias;
        this.phoneNumber = phoneNumber;

   }

   

    }

}
