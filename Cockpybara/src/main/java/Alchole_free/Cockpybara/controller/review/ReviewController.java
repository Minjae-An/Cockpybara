package Alchole_free.Cockpybara.controller.review;

import Alchole_free.Cockpybara.controller.review.add_review.AddReviewRequest;
import Alchole_free.Cockpybara.controller.review.commented_recipes.CommentedRecipesResponse;
import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.service.review.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/recipe/detail/{recipeId}")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("{memberId}")
    public ResponseEntity<String> addReview(@PathVariable Long recipeId,
                                            @PathVariable Long memberId,
                                            @RequestBody @Valid AddReviewRequest addReviewRequest) {
        Integer stars = addReviewRequest.getStars();
        String review = addReviewRequest.getReview();

        reviewService.addReview(recipeId, memberId, stars, review);
        return ResponseEntity.ok("successfully add new review");
    }

    @DeleteMapping("{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable Long recipeId, @PathVariable Long reviewId) {
        reviewService.deleteReview(recipeId, reviewId);

        return ResponseEntity.accepted().body("successfully delete review");
    }

    @GetMapping("/user/{userId}/my-page/commented-recipes")
    public ResponseEntity<List<CommentedRecipesResponse>> getCommentedRecipes(@PathVariable Long userId){
        List<CocktailRecipe> commentedRecipes = reviewService.findCommentedRecipesByMember(userId);

        List<CommentedRecipesResponse> commentedRecipesResponses = commentedRecipes.stream().map(cocktailRecipe ->
                        new CommentedRecipesResponse(cocktailRecipe.getName(), cocktailRecipe.getDrinkImgPath(), cocktailRecipe.getCreatedAt()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(commentedRecipesResponses);
    }
}
