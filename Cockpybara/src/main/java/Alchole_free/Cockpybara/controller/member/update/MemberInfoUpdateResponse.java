package Alchole_free.Cockpybara.controller.member.update;

import Alchole_free.Cockpybara.domain.member.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MemberInfoUpdateResponse {
    private final Member member;
}
