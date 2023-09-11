package Alchole_free.Cockpybara.config;

import Alchole_free.Cockpybara.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//@Slf4j
@Configuration
//@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

//    private final LoginInterceptor loginInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor())
                .order(1)
                .addPathPatterns("/**")
                .excludePathPatterns("/", "/join", "/login",
                        "/css/**", "/*.ico", "/error");
    }
}
