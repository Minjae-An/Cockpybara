package Alchole_free.Cockpybara.controller.community;

import Alchole_free.Cockpybara.controller.community.member_info.MemberInfoResponse;
import Alchole_free.Cockpybara.domain.member.Member;
import Alchole_free.Cockpybara.service.member.MemberService;
import Alchole_free.Cockpybara.service.cocktail_recipe.CocktailRecipeService;
import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.cocktail_recipe.time_period.TimePeriod;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


import java.util.ArrayList;
import java.util.List;
@RestController
@RequiredArgsConstructor
public class CommunityController {
    private final MemberService memberService;
    private final CocktailRecipeService cocktailRecipeService;
    @GetMapping("/community")
    public MemberInfoResponse getMemberInfo(String email) {
        Member member = memberService.findByEmail(email);

        return new MemberInfoResponse(member.getId(), member.getAlias());
    }
    @GetMapping("/community/cocktails")
    public List<CocktailRecipe> getCocktailRecipesByPeriod(@RequestParam(value = "period", required = false) List<String> periods) {
        if (periods == null || periods.isEmpty()) {
            //기간 파라미터가 전달되지 않은 경우 기본값으로 전체 기간 조회
            return cocktailRecipeService.getCocktailRecipesByPeriod(TimePeriod.ALL);
        } else {
            List<CocktailRecipe> resultList = new ArrayList<>();
            for (String period : periods) {
                switch (period) {
                    case "weekly":
                        resultList.addAll(cocktailRecipeService.getCocktailRecipesByPeriod(TimePeriod.WEEKLY));
                        break;
                    case "monthly":
                        resultList.addAll(cocktailRecipeService.getCocktailRecipesByPeriod(TimePeriod.MONTHLY));
                        break;
                    default:resultList.addAll(cocktailRecipeService.getCocktailRecipesByPeriod(TimePeriod.ALL));
                }
            }
            return resultList;
        }
    }
}
