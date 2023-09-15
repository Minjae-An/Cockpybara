package Alchole_free.Cockpybara.controller.cocktailrecipe;

import Alchole_free.Cockpybara.controller.cocktailrecipe.option_list.CocktailRecipeSearchOptionListResponse;
import Alchole_free.Cockpybara.controller.cocktailrecipe.recipe_detail.CocktailRecipeDetailDTO;
import Alchole_free.Cockpybara.controller.cocktailrecipe.search.CocktailRecipeSearchDTO;
import Alchole_free.Cockpybara.domain.cocktail_recipe.AlcoholicType;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Category;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Glass;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import Alchole_free.Cockpybara.domain.cocktail_recipe.time_period.TimePeriod;
import Alchole_free.Cockpybara.domain.ingredient.IngredientCategory;
import Alchole_free.Cockpybara.repository.cocktail_recipe.condition.CocktailRecipeSearchCondition;
import Alchole_free.Cockpybara.service.cocktail_recipe.CocktailRecipeService;
import Alchole_free.Cockpybara.util.pagination.CustomPageRequest;
import Alchole_free.Cockpybara.util.pagination.CustomPageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class CocktailRecipeController {

    private final CocktailRecipeService cocktailRecipeService;

    @GetMapping("/recipe/option-list")
    public ResponseEntity<CocktailRecipeSearchOptionListResponse> getCocktailRecipeSearchOptionList() {
        List<String> alcoholicTypes = getEnumValueList(AlcoholicType.class);
        List<String> categories = getEnumValueList(Category.class);
        List<String> glasses = getEnumValueList(Glass.class);
        List<String> ingredientCategories = getEnumValueList(IngredientCategory.class);
        List<String> tastes = getEnumValueList(Taste.class);

        return ResponseEntity.ok(new CocktailRecipeSearchOptionListResponse(
                alcoholicTypes,
                categories,
                glasses,
                ingredientCategories,
                tastes
        ));
    }

    private <T extends Enum<T>> List<String> getEnumValueList(Class<T> enumClass) {
        return Arrays.stream(enumClass.getEnumConstants())
                .map(Enum::name)
                .collect(Collectors.toList());
    }

    @GetMapping("/recipe/detail")
    public ResponseEntity<CocktailRecipeDetailDTO> getRecipeDetails(Long cocktailRecipeId) {
        CocktailRecipeDetailDTO detail = cocktailRecipeService.getDetail(cocktailRecipeId);

        return ResponseEntity.ok(detail);
    }

    @GetMapping({"/community/period-cocktails", "/recipe/period-cocktails"})
    public ResponseEntity<CustomPageResponse<CocktailRecipeSearchDTO>> getCocktailRecipesByPeriod(
            @RequestParam(value = "period", required = false) TimePeriod period,
            CustomPageRequest pageRequest) {
        period=period==null?TimePeriod.ALL:period;

        CustomPageResponse<CocktailRecipeSearchDTO> response = cocktailRecipeService.getCocktailRecipesByPeriod(period, pageRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/recipe/search")
    public ResponseEntity<CustomPageResponse<CocktailRecipeSearchDTO>> search(CocktailRecipeSearchCondition searchCondition, CustomPageRequest pageRequest) {
        CustomPageResponse<CocktailRecipeSearchDTO> response = cocktailRecipeService.search(searchCondition, pageRequest);
        return ResponseEntity.ok(response);
    }
}
