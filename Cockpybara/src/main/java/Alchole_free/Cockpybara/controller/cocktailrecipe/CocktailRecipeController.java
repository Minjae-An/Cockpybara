package Alchole_free.Cockpybara.controller.cocktailrecipe;

import Alchole_free.Cockpybara.controller.cocktailrecipe.option_list.CocktailRecipeSearchOptionListResponse;
import Alchole_free.Cockpybara.controller.cocktailrecipe.recipe_detail.CocktailRecipeDetailResponse;
import Alchole_free.Cockpybara.controller.cocktailrecipe.search_by_name.FindCocktailRecipeByNameResponse;
import Alchole_free.Cockpybara.domain.cocktail_recipe.AlcoholicType;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Category;
import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Glass;
import Alchole_free.Cockpybara.service.cocktail_recipe.CocktailRecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class CocktailRecipeController {

    private final CocktailRecipeService cocktailRecipeService;

    @GetMapping("/recipe/option-list")
    public CocktailRecipeSearchOptionListResponse getCocktailRecipeSearchOptionList() {
        List<String> alcoholicTypeFilterValues = getEnumValueList(AlcoholicType.class);
        List<String> categoryFilterValues = getEnumValueList(Category.class);
        List<String> glassFilterValues = getEnumValueList(Glass.class);

        return new CocktailRecipeSearchOptionListResponse(
                alcoholicTypeFilterValues,
                categoryFilterValues,
                glassFilterValues
        );
    }


    @GetMapping("/recipe/search")
    public FindCocktailRecipeByNameResponse findByName(String name) {
        List<CocktailRecipe> foundList =
                cocktailRecipeService.findCocktailRecipeByNameContaining(name);

        return new FindCocktailRecipeByNameResponse(foundList);
    }

    private <T extends Enum<T>> List<String> getEnumValueList(Class<T> enumClass) {
        return Arrays.stream(enumClass.getEnumConstants())
                .map(enumValue -> enumValue.name())
                .collect(Collectors.toList());
    }

    @GetMapping("/recipe/detail")
    public CocktailRecipeDetailResponse getRecipeDetails(Long cocktailRecipeId){
        CocktailRecipe cocktailRecipe = cocktailRecipeService.findById(cocktailRecipeId);
        
        return new CocktailRecipeDetailResponse(cocktailRecipe);
    }

}
