package Alchole_free.Cockpybara.controller.my_recipe;

import Alchole_free.Cockpybara.controller.my_recipe.add_new_my_recipe.AddNewMyRecipeRequest;
import Alchole_free.Cockpybara.controller.my_recipe.recipe_options.RecipeOptionsResponse;
import Alchole_free.Cockpybara.domain.cocktail_recipe.AlcoholicType;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Category;
import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Glass;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import Alchole_free.Cockpybara.domain.ingredient.Unit;
import Alchole_free.Cockpybara.service.cocktail_recipe.CocktailRecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user/{userId}/my-recipe")
public class MyRecipeController {
    private final CocktailRecipeService cocktailRecipeService;

    @GetMapping
    public ResponseEntity<RecipeOptionsResponse> getRecipeOptionValues() {
        RecipeOptionsResponse recipeOptionsResponse = new RecipeOptionsResponse(
                Glass.values(),
                Category.values(),
                AlcoholicType.values(),
                Taste.values(),
                Unit.values()
        );

        return ResponseEntity.ok(recipeOptionsResponse);
    }


    @PostMapping
    public ResponseEntity<String> addNewMyRecipe(@PathVariable Long userId,
                                                 @RequestBody AddNewMyRecipeRequest addNewMyRecipeRequest) {
        addNewMyRecipeRequest.setIsMemberRecipe(true);
        addNewMyRecipeRequest.setCreatedAt(LocalDateTime.now());
        CocktailRecipe cocktailRecipe = addNewMyRecipeRequest.to();

        cocktailRecipeService.saveMyRecipe(userId, cocktailRecipe);

        return ResponseEntity.ok("successfully save new my cocktailrecipe");
    }


}
