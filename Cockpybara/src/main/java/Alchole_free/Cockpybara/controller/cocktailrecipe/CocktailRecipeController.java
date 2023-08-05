package Alchole_free.Cockpybara.controller.cocktailrecipe;

import Alchole_free.Cockpybara.controller.cocktailrecipe.option_list.CocktailRecipeSearchOptionListResponse;
import Alchole_free.Cockpybara.controller.cocktailrecipe.recipe_detail.CocktailRecipeDetailResponse;
import Alchole_free.Cockpybara.controller.cocktailrecipe.search_by_name.FindCocktailRecipeByNameResponse;
import Alchole_free.Cockpybara.domain.cocktail_recipe.AlcoholicType;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Category;
import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Glass;
import Alchole_free.Cockpybara.domain.cocktail_recipe.time_period.TimePeriod;
import Alchole_free.Cockpybara.domain.ingredient.IngredientCategory;
import Alchole_free.Cockpybara.service.cocktail_recipe.CocktailRecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
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
        List<String> ingredientCategoryFilterValues = getEnumValueList(IngredientCategory.class);

        return new CocktailRecipeSearchOptionListResponse(
                alcoholicTypeFilterValues,
                categoryFilterValues,
                glassFilterValues,
                ingredientCategoryFilterValues
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
    public CocktailRecipeDetailResponse getRecipeDetails(Long cocktailRecipeId) {
        CocktailRecipe cocktailRecipe = cocktailRecipeService.findById(cocktailRecipeId);

        return new CocktailRecipeDetailResponse(cocktailRecipe);
    }

    @GetMapping({"/community/period-cocktails", "/recipe/period-cocktails"})
    public List<CocktailRecipe> getCocktailRecipesByPeriod(@RequestParam(value = "period", required = false) List<String> periods) {
        if (periods == null || periods.isEmpty()) {
            //기간 파라미터가 전달되지 않은 경우 기본값으로 전체 기간 조회
            return cocktailRecipeService.getCocktailRecipesByPeriod(TimePeriod.ALL);
        } else {
            List<CocktailRecipe> resultList = new ArrayList<>();
            for (String period : periods) {
                switch (period) {
                    case "weekly":
                        resultList.addAll(cocktailRecipeService.getCocktailRecipesByPeriod(TimePeriod.WEEKLY));
                        break;
                    case "monthly":
                        resultList.addAll(cocktailRecipeService.getCocktailRecipesByPeriod(TimePeriod.MONTHLY));
                        break;
                    default:resultList.addAll(cocktailRecipeService.getCocktailRecipesByPeriod(TimePeriod.ALL));
                }
            }
            return resultList;
        }
    }
}
