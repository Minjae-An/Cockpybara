package Alchole_free.Cockpybara.controller.member.detail;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DetailRequest {
    @NotNull
    private String email;
}
