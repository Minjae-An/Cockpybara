package Alchole_free.Cockpybara.controller.community;

import Alchole_free.Cockpybara.controller.community.member_info.MemberInfoResponse;
import Alchole_free.Cockpybara.domain.member.Member;
import Alchole_free.Cockpybara.service.member.MemberService;
import Alchole_free.Cockpybara.service.cocktail_recipe.CocktailRecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
