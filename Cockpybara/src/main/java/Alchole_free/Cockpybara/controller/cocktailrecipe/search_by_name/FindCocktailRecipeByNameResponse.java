package Alchole_free.Cockpybara.controller.cocktailrecipe.search_by_name;

import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
@Getter
public class FindCocktailRecipeByNameResponse {
    private final List<CocktailRecipe> searchCocktailRecipeList;
}
