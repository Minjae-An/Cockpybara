package Alchole_free.Cockpybara.controller.community.member_info;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MemberInfoResponse {
    private final Long userId;
    private final String alias;
    private final String imageUrl;
}
