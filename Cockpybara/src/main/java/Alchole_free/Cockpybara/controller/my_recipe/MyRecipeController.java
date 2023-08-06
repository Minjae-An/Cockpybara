package Alchole_free.Cockpybara.controller.my_recipe;

import Alchole_free.Cockpybara.controller.my_recipe.add_new_my_recipe.AddNewMyRecipeRequest;
import Alchole_free.Cockpybara.controller.my_recipe.recipe_options.RecipeOptionsResponse;
import Alchole_free.Cockpybara.controller.my_recipe.update_my_recipe.UpdateMyRecipeRequest;
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
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user/{userId}/my-recipe")
public class MyRecipeController {
    private final CocktailRecipeService cocktailRecipeService;

    @GetMapping("/filter-values")
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
    public ResponseEntity<CocktailRecipe> addNewMyRecipe(@PathVariable Long userId,
                                                         @RequestBody AddNewMyRecipeRequest addNewMyRecipeRequest) {
        addNewMyRecipeRequest.setIsMemberRecipe(true);
        addNewMyRecipeRequest.setCreatedAt(LocalDateTime.now());
        CocktailRecipe cocktailRecipe = addNewMyRecipeRequest.to();

        CocktailRecipe savedMyCocktailRecipe =
                cocktailRecipeService.saveMyRecipe(userId, cocktailRecipe).getCocktailRecipe();

        return ResponseEntity.ok(savedMyCocktailRecipe);
    }

    @DeleteMapping("/{recipeId}")
    public ResponseEntity<String> deleteMyRecipe(@PathVariable Long userId,
                                                 @PathVariable Long recipeId) {
        cocktailRecipeService.removeMyRecipe(userId, recipeId);

        return ResponseEntity.ok("successfully delete recipe");
    }

    @PutMapping("/{recipeId}")
    public ResponseEntity<CocktailRecipe> updateMyRecipe(@PathVariable Long recipeId,
                                                         @RequestBody UpdateMyRecipeRequest updateMyRecipeRequest){
        AlcoholicType alcoholicType = updateMyRecipeRequest.getAlcoholicType();
        Category category = updateMyRecipeRequest.getCategory();
        String drinkImgPath = updateMyRecipeRequest.getDrinkImgPath();
        Glass glass = updateMyRecipeRequest.getGlass();
        String instruction = updateMyRecipeRequest.getInstruction();
        List<Taste> tastes = updateMyRecipeRequest.getTastes();

        CocktailRecipe cocktailRecipe = cocktailRecipeService.updateMyRecipe(recipeId, alcoholicType, category, drinkImgPath,
                glass, instruction, tastes);

        return ResponseEntity.ok(cocktailRecipe);
    }
}
