package Alchole_free.Cockpybara.controller.cocktailrecipe.recipe_detail;

import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class CocktailRecipeDetailResponse {
    private final CocktailRecipe cocktailRecipe;
}
