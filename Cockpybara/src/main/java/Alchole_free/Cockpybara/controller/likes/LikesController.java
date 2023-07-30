package Alchole_free.Cockpybara.controller.likes;

import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.member.Member;
import Alchole_free.Cockpybara.domain.member.likes.Like;
import Alchole_free.Cockpybara.service.cocktail_recipe.CocktailRecipeService;
import Alchole_free.Cockpybara.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user/{userId}/likes")
public class LikesController {
    private final MemberService memberService;
    private final CocktailRecipeService cocktailRecipeService;

    @PostMapping("/{recipeId}")
    public ResponseEntity<String> addLike(@PathVariable Long userId, @PathVariable Long recipeId) {
        Member member = memberService.findById(userId);
        CocktailRecipe cocktailRecipe = cocktailRecipeService.findById(recipeId);

        member.getLikes().add(new Like(member, cocktailRecipe));

        return ResponseEntity.accepted().body("add like successfully");
    }

    @DeleteMapping("/{recipeId}")
    public ResponseEntity<String> deleteLike(@PathVariable Long userId, @PathVariable Long recipeId) {
        Member member = memberService.findById(userId);

        member.getLikes().removeIf(like -> like.getCocktailRecipe().getId().equals(recipeId));

        return ResponseEntity.accepted().body("delete like successfully");
    }
}
