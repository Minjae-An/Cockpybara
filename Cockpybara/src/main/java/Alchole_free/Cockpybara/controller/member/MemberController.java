package Alchole_free.Cockpybara.controller.member;

import Alchole_free.Cockpybara.controller.member.detail.DetailRequest;
import Alchole_free.Cockpybara.controller.member.detail.DetailResponse;
import Alchole_free.Cockpybara.controller.member.join.JoinRequest;
import Alchole_free.Cockpybara.controller.member.join.JoinResponse;
import Alchole_free.Cockpybara.controller.member.util.HashingUtil;
import Alchole_free.Cockpybara.domain.Member;
import Alchole_free.Cockpybara.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/join")
    public JoinResponse join(@RequestBody @Valid JoinRequest joinRequest){
        String email = HashingUtil.hashPassword(joinRequest.getEmail());
        String password = HashingUtil.hashPassword(joinRequest.getPassword());
        String alias = joinRequest.getAlias();
        String phoneNumber = joinRequest.getPhoneNumber();

        Long joinedMemberId = memberService.join(new Member(email, password, alias, phoneNumber));
        return new JoinResponse(joinedMemberId);
    }

    @GetMapping("/user/detail")
    public DetailResponse getMemberDetails(@RequestBody @Valid DetailRequest detailRequest){
        String email = detailRequest.getEmail();

        Member member = memberService.findByEmail(email);
        return new DetailResponse(member);
    }
}
