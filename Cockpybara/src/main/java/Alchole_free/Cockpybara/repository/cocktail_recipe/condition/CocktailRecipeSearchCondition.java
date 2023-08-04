package Alchole_free.Cockpybara.repository.cocktail_recipe.condition;

import Alchole_free.Cockpybara.domain.cocktail_recipe.AlcoholicType;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Category;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Glass;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import Alchole_free.Cockpybara.domain.ingredient.IngredientCategory;
import lombok.Data;

import java.util.List;

@Data
public class CocktailRecipeSearchCondition {
    private String name;

    private List<AlcoholicType> alcoholicTypes;
    private List<Category> categories;
    private List<Glass> glasses;
    private List<Boolean> isMemberRecipes;
    private List<Taste> tastes;
    private List<IngredientCategory> ingredientCategories;
}
