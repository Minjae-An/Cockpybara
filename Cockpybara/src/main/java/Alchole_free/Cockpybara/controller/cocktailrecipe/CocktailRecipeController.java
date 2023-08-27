package Alchole_free.Cockpybara.controller.cocktailrecipe;

import Alchole_free.Cockpybara.controller.cocktailrecipe.option_list.CocktailRecipeSearchOptionListResponse;
import Alchole_free.Cockpybara.controller.cocktailrecipe.recipe_detail.CocktailRecipeDetailDTO;
import Alchole_free.Cockpybara.controller.cocktailrecipe.search.CocktailRecipeSearchDTO;
import Alchole_free.Cockpybara.controller.pagination.CustomPageRequest;
import Alchole_free.Cockpybara.controller.pagination.CustomPageResponse;
import Alchole_free.Cockpybara.domain.cocktail_recipe.AlcoholicType;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Category;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Glass;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import Alchole_free.Cockpybara.domain.cocktail_recipe.time_period.TimePeriod;
import Alchole_free.Cockpybara.domain.ingredient.IngredientCategory;
import Alchole_free.Cockpybara.repository.cocktail_recipe.condition.CocktailRecipeSearchCondition;
import Alchole_free.Cockpybara.service.cocktail_recipe.CocktailRecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
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


    @GetMapping("/recipe/search")
    public ResponseEntity<CustomPageResponse<CocktailRecipeSearchDTO>> findByName(String name, CustomPageRequest pageRequest) {
        Page<CocktailRecipeSearchDTO> searchDTOS = cocktailRecipeService.findCocktailRecipeByNameContaining(name, pageRequest);
        return ResponseEntity.ok(new CustomPageResponse<>(searchDTOS));
    }

    private <T extends Enum<T>> List<String> getEnumValueList(Class<T> enumClass) {
        return Arrays.stream(enumClass.getEnumConstants())
                .map(enumValue -> enumValue.name())
                .collect(Collectors.toList());
    }

    @GetMapping("/recipe/detail")
    public ResponseEntity<CocktailRecipeDetailDTO> getRecipeDetails(Long cocktailRecipeId) {
        CocktailRecipeDetailDTO detail = cocktailRecipeService.getDetail(cocktailRecipeId);

        return ResponseEntity.ok(detail);
    }

    @GetMapping({"/community/period-cocktails", "/recipe/period-cocktails"})
    public ResponseEntity<List<CocktailRecipeSearchDTO>> getCocktailRecipesByPeriod(@RequestParam(value = "period", required = false) List<String> periods) {
        List<CocktailRecipeSearchDTO> resultList = new ArrayList<>();

        if (periods == null || periods.isEmpty()) {
            //기간 파라미터가 전달되지 않은 경우 기본값으로 전체 기간 조회
            resultList = cocktailRecipeService.getCocktailRecipesByPeriod(TimePeriod.ALL);
        } else {
            for (String period : periods) {
                switch (period) {
                    case "weekly":
                        resultList.addAll(cocktailRecipeService.getCocktailRecipesByPeriod(TimePeriod.WEEKLY));
                        break;
                    case "monthly":
                        resultList.addAll(cocktailRecipeService.getCocktailRecipesByPeriod(TimePeriod.MONTHLY));
                        break;
                    default:
                        resultList.addAll(cocktailRecipeService.getCocktailRecipesByPeriod(TimePeriod.ALL));
                }
            }
        }

        return ResponseEntity.ok(resultList);
    }

    @PostMapping("/recipe/search")
    public ResponseEntity<List<CocktailRecipeSearchDTO>> search(CocktailRecipeSearchCondition searchCondition) {
        List<CocktailRecipeSearchDTO> searchResult = cocktailRecipeService.search(searchCondition);

        return ResponseEntity.ok(searchResult);
    }
}
