package Alchole_free.Cockpybara.config;

import com.google.common.base.Predicate;
import com.google.common.base.Predicates;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.UiConfiguration;
import springfox.documentation.swagger.web.UiConfigurationBuilder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration // 스프링 실행시 설정을 적용하기 위한 애노테이션
@EnableSwagger2 // Swagger2 사용
@SuppressWarnings("unchecked") // warning 밑줄 제거
public class SwaggerConfig extends WebMvcConfigurationSupport {
    //리소스 핸들러

    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
        registry.addResourceHandler("swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
    }

    //API 구분 설정
    @Bean
    public Docket allApi() {
        return getDocket("전체", Predicates.or(
                PathSelectors.regex("/*.*")));
    }

    //swagger 설정
    public Docket getDocket(String groupName, Predicate<String> predicate) {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName(groupName)
                .select()
                .apis(RequestHandlerSelectors.basePackage("Alchole_free.Cockpybara"))
                .paths(predicate)
                .apis(RequestHandlerSelectors.any())
                .build();
    }

    //swagger ui 설정
    @Bean
    public UiConfiguration uiConfig(){
        return UiConfigurationBuilder.builder()
                .displayRequestDuration(true)
                .validatorUrl("")
                .build();
    }

}
