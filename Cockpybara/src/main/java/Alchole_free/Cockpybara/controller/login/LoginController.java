package Alchole_free.Cockpybara.controller.login;

import Alchole_free.Cockpybara.constant.SessionLoginConst;
import Alchole_free.Cockpybara.controller.login.find_email.FindEmailRequest;
import Alchole_free.Cockpybara.controller.login.find_email.FindEmailResponse;
import Alchole_free.Cockpybara.controller.login.find_password.FindPasswordRequest;
import Alchole_free.Cockpybara.controller.login.set_new_password.SetNewPasswordRequest;
import Alchole_free.Cockpybara.controller.member.util.HashingUtil;
import Alchole_free.Cockpybara.domain.member.Member;
import Alchole_free.Cockpybara.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
    public ResponseEntity<String> findPassword(@Valid FindPasswordRequest findPasswordRequest) {
        String email = findPasswordRequest.getEmail();
        String alias = findPasswordRequest.getAlias();
        String phoneNumber = findPasswordRequest.getPhoneNumber();

        memberService.findPassword(email, alias, phoneNumber);

        return new ResponseEntity<>("Find Password Success", HttpStatus.OK);
    }

    @PutMapping("/login/help/begin")
    public ResponseEntity<String> setNewPassword
            (@Valid @RequestBody SetNewPasswordRequest setNewPasswordRequest) {
        String email = setNewPasswordRequest.getEmail();
        String password = HashingUtil.hashValue(setNewPasswordRequest.getPassword());

        memberService.setNewPassword(email, password);

        return new ResponseEntity<>("Change Password Success", HttpStatus.OK);
    }


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid LoginRequest loginRequest,
                                        BindingResult bindingResult, HttpServletRequest request) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.TEMPORARY_REDIRECT)
                    .header("Location", "/login")
                    .build();
        }

        String email = loginRequest.getEmail();
        String password = HashingUtil.hashValue(loginRequest.getPassword());

        Member loginMember = memberService.login(email, password);

        //로그인 성공 처리
        HttpSession session = request.getSession();
        session.setAttribute(SessionLoginConst.LOGIN_MEMBER, loginMember);

        return ResponseEntity.ok("Login Success");
    }
}
