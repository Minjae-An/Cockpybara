package Alchole_free.Cockpybara.controller.my_recipe;

import Alchole_free.Cockpybara.controller.my_recipe.add_new_my_recipe.AddNewMyRecipeRequest;
import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
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
