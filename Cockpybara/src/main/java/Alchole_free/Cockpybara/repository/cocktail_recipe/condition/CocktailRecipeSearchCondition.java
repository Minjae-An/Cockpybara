package Alchole_free.Cockpybara.repository.cocktail_recipe.condition;

import Alchole_free.Cockpybara.domain.cocktail_recipe.AlcoholicType;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Category;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Glass;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.RecipeTaste;
import lombok.Data;

@Data
public class CocktailRecipeSearchCondition {
    private String name;
    private AlcoholicType alcoholicType;
    private Category category;
    private Glass glass;

    private Boolean isMemberRecipe=false;
    private RecipeTaste recipeTaste;
}
