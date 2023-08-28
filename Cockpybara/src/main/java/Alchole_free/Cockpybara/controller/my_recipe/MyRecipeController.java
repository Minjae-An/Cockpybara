package Alchole_free.Cockpybara.controller.my_recipe;

import Alchole_free.Cockpybara.controller.cocktailrecipe.recipe_detail.CocktailRecipeDetailDTO;
import Alchole_free.Cockpybara.controller.my_recipe.add_new_my_recipe.AddNewMyRecipeRequest;
import Alchole_free.Cockpybara.controller.my_recipe.add_new_my_recipe.AddNewMyRecipeResponse;
import Alchole_free.Cockpybara.controller.my_recipe.my_recipes.MyRecipeDTO;
import Alchole_free.Cockpybara.controller.my_recipe.recipe_options.RecipeOptionsResponse;
import Alchole_free.Cockpybara.controller.my_recipe.update_my_recipe.UpdateMyRecipeRequest;
import Alchole_free.Cockpybara.controller.my_recipe.update_my_recipe.UpdateMyRecipeResponse;
import Alchole_free.Cockpybara.domain.cocktail_recipe.AlcoholicType;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Category;
import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Glass;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import Alchole_free.Cockpybara.domain.ingredient.IngredientCategory;
import Alchole_free.Cockpybara.domain.ingredient.IngredientUnitMap;
import Alchole_free.Cockpybara.domain.ingredient.Unit;
import Alchole_free.Cockpybara.service.cocktail_recipe.CocktailRecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MyRecipeController {
    private final CocktailRecipeService cocktailRecipeService;

    @GetMapping("/user/{userId}/my-page/filter-values")
    public ResponseEntity<RecipeOptionsResponse> getRecipeOptionValues() {
        Map<IngredientCategory, Unit[]> ingredientUnitMap = IngredientUnitMap.createIngredientUnitMap();

        RecipeOptionsResponse recipeOptionsResponse = new RecipeOptionsResponse(
                Glass.values(),
                Category.values(),
                AlcoholicType.values(),
                Taste.values(),
                ingredientUnitMap
        );

        return ResponseEntity.ok(recipeOptionsResponse);
    }


    @PostMapping("/user/{userId}/my-recipe")
    public ResponseEntity<AddNewMyRecipeResponse> addNewMyRecipe(@PathVariable Long userId,
                                                                 @RequestBody @Valid AddNewMyRecipeRequest addNewMyRecipeRequest) {
        AddNewMyRecipeResponse addNewMyRecipeResponse = cocktailRecipeService.saveMyRecipe(userId, addNewMyRecipeRequest);
        return ResponseEntity.ok(addNewMyRecipeResponse);
    }

    @DeleteMapping("/user/{userId}/my-recipe/{recipeId}")
    public ResponseEntity<String> deleteMyRecipe(@PathVariable Long userId,
                                                 @PathVariable Long recipeId) {
        cocktailRecipeService.removeMyRecipe(userId, recipeId);

        return ResponseEntity.ok("successfully delete recipe");
    }

    //DTO로 변환 작업 필요
    @PutMapping("/user/{userId}/my-recipe/{recipeId}")
    public ResponseEntity<UpdateMyRecipeResponse> updateMyRecipe(@PathVariable Long recipeId,
                                                                 @RequestBody @Valid UpdateMyRecipeRequest updateMyRecipeRequest) {

        UpdateMyRecipeResponse updateMyRecipeResponse = cocktailRecipeService.updateMyRecipe(recipeId, updateMyRecipeRequest);
        return ResponseEntity.ok(updateMyRecipeResponse);
    }

    @GetMapping("/user/{userId}/my-page/my-recipes")
    public ResponseEntity<List<MyRecipeDTO>> getMyRecipe(@PathVariable Long userId) {
        List<MyRecipeDTO> myRecipes = cocktailRecipeService.getMyRecipe(userId);

        return ResponseEntity.ok(myRecipes);
    }

    @GetMapping("/user/{userId}/my-recipe/details/{myRecipeId}")
    public ResponseEntity<CocktailRecipeDetailDTO> getMyRecipeDetail(@PathVariable Long myRecipeId) {
        CocktailRecipeDetailDTO detail = cocktailRecipeService.getDetail(myRecipeId);

        return ResponseEntity.ok(detail);
    }
}
