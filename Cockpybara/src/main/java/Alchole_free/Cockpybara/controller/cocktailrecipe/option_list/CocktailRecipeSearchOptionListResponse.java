package Alchole_free.Cockpybara.controller.cocktailrecipe.option_list;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class CocktailRecipeSearchOptionListResponse {
    private final List<String> alcoholicTypeFilterValues;
    private final List<String> categoryFilterValues;
    private final List<String> glassFilterValues;
}
