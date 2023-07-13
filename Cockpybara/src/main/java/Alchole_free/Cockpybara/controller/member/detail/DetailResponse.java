package Alchole_free.Cockpybara.controller.member.detail;

import Alchole_free.Cockpybara.domain.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class DetailResponse {
    private final Member member;
}
