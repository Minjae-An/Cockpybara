package Alchole_free.Cockpybara.controller.ingredient.search_ingredient;

import Alchole_free.Cockpybara.domain.ingredient.Ingredient;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
@Getter
public class SearchIngredientResponse {
    private final List<Ingredient> ingredientList;
}
