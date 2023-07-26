package Alchole_free.Cockpybara.controller.member;

import Alchole_free.Cockpybara.controller.member.detail.DetailRequest;
import Alchole_free.Cockpybara.controller.member.detail.DetailResponse;
import Alchole_free.Cockpybara.controller.member.join.JoinRequest;
import Alchole_free.Cockpybara.controller.member.join.JoinResponse;

import Alchole_free.Cockpybara.controller.member.update.MemberInfoUpdateRequest;
import Alchole_free.Cockpybara.controller.member.update.MemberInfoUpdateResponse;
import Alchole_free.Cockpybara.controller.member.util.HashingUtil;
import Alchole_free.Cockpybara.domain.Gender;
import Alchole_free.Cockpybara.domain.Member;
import Alchole_free.Cockpybara.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Date;


@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/join")
    public JoinResponse join(@RequestBody @Valid JoinRequest joinRequest) {
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
    public DetailResponse getMemberDetails(@Valid DetailRequest detailRequest) {

        String email = detailRequest.getEmail();

        Member member = memberService.findByEmail(email);
        return new DetailResponse(member);
    }

    @DeleteMapping("/user/{userId}/my-page")
    public ResponseEntity<String> memberLeave(@PathVariable Long userId) {
        memberService.memberLeave(userId);

        return new ResponseEntity<>("정상 처리 되었습니다", HttpStatus.NO_CONTENT);
    }

    @PutMapping("/user/{userId}/my-page")
    public ResponseEntity<MemberInfoUpdateResponse> updateMemberInfo(@Valid @RequestBody MemberInfoUpdateRequest updateRequest,
                                                                     @PathVariable("userId") Long userId) {
        String alias = updateRequest.getAlias();
        String phoneNumber = updateRequest.getPhoneNumber();

        Member member = memberService.updateMemberInfo(userId, alias, phoneNumber);

        return ResponseEntity.ok()
                .body(new MemberInfoUpdateResponse(member));
    }
}
