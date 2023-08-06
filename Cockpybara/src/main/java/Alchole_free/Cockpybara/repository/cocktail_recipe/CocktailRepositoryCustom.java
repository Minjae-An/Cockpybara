package Alchole_free.Cockpybara.repository.cocktail_recipe;


import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.repository.cocktail_recipe.condition.CocktailRecipeSearchCondition;

import java.util.List;

public interface CocktailRepositoryCustom {
    List<CocktailRecipe> search(CocktailRecipeSearchCondition searchCondition);
}
