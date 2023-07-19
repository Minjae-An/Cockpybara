package Alchole_free.Cockpybara.controller.cocktailrecipe;

import Alchole_free.Cockpybara.controller.cocktailrecipe.search_by_name.FindCocktailRecipeByNameResponse;
import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.service.cocktail_recipe.CocktailRecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CocktailRecipeController {

    private final CocktailRecipeService cocktailRecipeService;

    @GetMapping("/recipe/search")
    public FindCocktailRecipeByNameResponse findByName(String name){
        List<CocktailRecipe> foundList =
                cocktailRecipeService.findCocktailRecipeByNameContaining(name);

        return new FindCocktailRecipeByNameResponse(foundList);
    }

}
