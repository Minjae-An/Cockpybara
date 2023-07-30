package Alchole_free.Cockpybara.controller.review;

import Alchole_free.Cockpybara.controller.review.add_review.AddReviewRequest;
import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.cocktail_recipe.review.Review;
import Alchole_free.Cockpybara.service.cocktail_recipe.CocktailRecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/recipe/detail/{recipeId}")
public class ReviewController {
    private final CocktailRecipeService cocktailRecipeService;

    @PostMapping
    public ResponseEntity<String> addReview(@PathVariable Long recipeId,
                                            @RequestBody @Valid AddReviewRequest addReviewRequest){
        CocktailRecipe cocktailRecipe = cocktailRecipeService.findById(recipeId);
        Integer stars = addReviewRequest.getStars();
        String review = addReviewRequest.getReview();

        cocktailRecipe.getReviews().add(new Review(cocktailRecipe, stars, review));

        return ResponseEntity.ok("successfully add new review");
    }

    @DeleteMapping("{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable Long recipeId, @PathVariable Long reviewId){
        CocktailRecipe cocktailRecipe = cocktailRecipeService.findById(recipeId);
        cocktailRecipe.getReviews().removeIf(review -> review.getId().equals(reviewId));

        return ResponseEntity.accepted().body("successfully delete review");
    }
}
