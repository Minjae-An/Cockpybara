package Alchole_free.Cockpybara.interceptor;

import Alchole_free.Cockpybara.constant.SessionLoginConst;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


@Slf4j
//@Component
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                             Object handler) throws Exception {

        HttpSession session = request.getSession();
        log.info("session = {}", session);
        if (session == null || session.getAttribute(SessionLoginConst.LOGIN_MEMBER) == null) {
            log.info("로그인되지 않은 사용자");
            response.sendRedirect("/login");
            return false;
        }

        log.info("정상 요청");

        return true;
    }
}
