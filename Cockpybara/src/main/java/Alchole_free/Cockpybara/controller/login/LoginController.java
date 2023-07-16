package Alchole_free.Cockpybara.controller.login;

import Alchole_free.Cockpybara.constant.SessionLoginConst;
import Alchole_free.Cockpybara.controller.member.util.HashingUtil;
import Alchole_free.Cockpybara.domain.Member;
import Alchole_free.Cockpybara.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class LoginController {
    private final MemberService memberService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid LoginRequest loginRequest,
                                        BindingResult bindingResult, HttpServletRequest request){
        if(bindingResult.hasErrors()){
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
