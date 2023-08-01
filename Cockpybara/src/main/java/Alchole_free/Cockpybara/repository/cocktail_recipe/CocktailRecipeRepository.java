package Alchole_free.Cockpybara.repository.cocktail_recipe;

import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CocktailRecipeRepository extends JpaRepository<CocktailRecipe, Long>, CocktailRepositoryCustom{

    List<CocktailRecipe> findCocktailRecipeByNameContaining(String name);
}
