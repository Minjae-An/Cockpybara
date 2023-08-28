package Alchole_free.Cockpybara.controller.cocktailrecipe.option_list;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class CocktailRecipeSearchOptionListResponse {
    private final List<String> alcoholicTypes;
    private final List<String> categories;
    private final List<String> glasses;

    private final List<String> ingredientCategories;
    private final List<String> tastes;
}
