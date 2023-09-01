package Alchole_free.Cockpybara.repository.cocktail_recipe;


import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.repository.cocktail_recipe.condition.CocktailRecipeSearchCondition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CocktailRecipeRepositoryCustom {
    Page<CocktailRecipe> search(CocktailRecipeSearchCondition searchCondition, Pageable pageable);
}
