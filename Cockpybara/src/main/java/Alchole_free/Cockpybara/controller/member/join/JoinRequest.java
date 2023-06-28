package Alchole_free.Cockpybara.controller.member.join;


import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JoinRequest {
    @NotNull
    private String email;

    @NotNull
    private String password;

    @NotNull
    private String alias;

    @NotNull
    private String phoneNumber;

    public JoinRequest(String email, String password, String alias, String phoneNumber) {
        this.email = email;
        this.password = password;
        this.alias = alias;
        this.phoneNumber = phoneNumber;
    }
}
