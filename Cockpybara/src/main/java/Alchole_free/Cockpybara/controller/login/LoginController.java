package Alchole_free.Cockpybara.controller.login;

import Alchole_free.Cockpybara.controller.login.find_email.FindEmailRequest;
import Alchole_free.Cockpybara.controller.login.find_email.FindEmailResponse;
import Alchole_free.Cockpybara.controller.login.find_password.FindPasswordRequest;
import Alchole_free.Cockpybara.controller.login.set_new_password.SetNewPasswordRequest;
import Alchole_free.Cockpybara.controller.member.util.HashingUtil;
import Alchole_free.Cockpybara.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final MemberService memberService;

    @GetMapping("/login/help/idInQuiry")
    public FindEmailResponse findEmail(@Valid FindEmailRequest findEmailRequest) {
        String alias = findEmailRequest.getAlias();
        String phoneNumber = findEmailRequest.getPhoneNumber();

        String email = memberService.findEmail(alias, phoneNumber);
        return new FindEmailResponse(email);
    }

    @GetMapping("/login/help/begin")
    public ResponseEntity<String> findPassword(@Valid FindPasswordRequest findPasswordRequest){
        String email = findPasswordRequest.getEmail();
        String alias = findPasswordRequest.getAlias();
        String phoneNumber = findPasswordRequest.getPhoneNumber();

        memberService.findPassword(email, alias, phoneNumber);

        return new ResponseEntity<>("정상 처리 되었습니다.", HttpStatus.OK);
    }

    @PutMapping("/login/help/begin")
    public ResponseEntity<String> setNewPassword
            (@Valid SetNewPasswordRequest setNewPasswordRequest){
        String email = setNewPasswordRequest.getEmail();
        String password = HashingUtil.hashValue(setNewPasswordRequest.getPassword());

        memberService.setNewPassword(email, password);

        return new ResponseEntity<>("정상 처리 되었습니다.", HttpStatus.OK);
    }
}
