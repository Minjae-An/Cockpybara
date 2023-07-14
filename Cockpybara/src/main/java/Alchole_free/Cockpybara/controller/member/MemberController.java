package Alchole_free.Cockpybara.controller.member;

import Alchole_free.Cockpybara.controller.member.detail.DetailRequest;
import Alchole_free.Cockpybara.controller.member.detail.DetailResponse;
import Alchole_free.Cockpybara.controller.member.join.JoinRequest;
import Alchole_free.Cockpybara.controller.member.join.JoinResponse;
import Alchole_free.Cockpybara.controller.member.util.HashingUtil;
import Alchole_free.Cockpybara.domain.Gender;
import Alchole_free.Cockpybara.domain.Member;
import Alchole_free.Cockpybara.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.sql.Date;


@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/join")
    public JoinResponse join(@RequestBody @Valid JoinRequest joinRequest){
        String email = joinRequest.getEmail();
        String password = HashingUtil.hashValue(joinRequest.getPassword());
        String alias = joinRequest.getAlias();
        String phoneNumber = joinRequest.getPhoneNumber();
        Gender gender = joinRequest.getGender();
        Date birth = joinRequest.getBirth();

        Long joinedMemberId = memberService.join(new Member(email, password, alias, phoneNumber, gender, birth));
        return new JoinResponse(joinedMemberId);
    }

    @GetMapping("/user/detail")
    public DetailResponse getMemberDetails(@Valid DetailRequest detailRequest){
        String email=detailRequest.getEmail();

        Member member = memberService.findByEmail(email);
        return new DetailResponse(member);
    }


}
