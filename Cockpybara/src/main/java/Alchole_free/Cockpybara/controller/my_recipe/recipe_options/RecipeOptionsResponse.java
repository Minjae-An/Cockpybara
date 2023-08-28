package Alchole_free.Cockpybara.controller.my_recipe.recipe_options;

import Alchole_free.Cockpybara.domain.cocktail_recipe.AlcoholicType;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Category;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Glass;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import Alchole_free.Cockpybara.domain.ingredient.IngredientCategory;
import Alchole_free.Cockpybara.domain.ingredient.IngredientUnitMap;
import Alchole_free.Cockpybara.domain.ingredient.Unit;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Map;

@RequiredArgsConstructor
@Getter
public class RecipeOptionsResponse {
    private final Glass[] glasses;
    private final Category[] categories;
    private final AlcoholicType[] alcoholicTypes;
    private final Taste[] tastes;

    private final Map<IngredientCategory, Unit[]> ingredientCategoryMap;
}
