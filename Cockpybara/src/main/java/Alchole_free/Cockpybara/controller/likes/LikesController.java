package Alchole_free.Cockpybara.controller.likes;

import Alchole_free.Cockpybara.controller.likes.add_like.AddLikeResponse;
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

    @PostMapping("/{recipeId}")
    public ResponseEntity<AddLikeResponse> addLike(@PathVariable Long userId, @PathVariable Long recipeId) {
        AddLikeResponse addLikeResponse = memberService.addLike(userId, recipeId);
        return ResponseEntity.ok(addLikeResponse);
    }

    @DeleteMapping("/{recipeId}")
    public ResponseEntity<String> deleteLike(@PathVariable Long userId, @PathVariable Long recipeId) {
        return null;
    }
}
