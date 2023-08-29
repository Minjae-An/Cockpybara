package Alchole_free.Cockpybara.controller.cocktailrecipe.search;

import Alchole_free.Cockpybara.controller.cocktailrecipe.recipe_detail.CocktailRecipeDetailDTO;
import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder

public class CocktailRecipeSearchDTO {
    private Long id;
    private String name;
    private String drinkImgPath;
    private String instruction;
    private List<Taste> tastes = new ArrayList<>();

    public static CocktailRecipeSearchDTO from(CocktailRecipe cocktailRecipe) {
        List<Taste> tastes = cocktailRecipe.getTastes().stream()
                .map(recipeTaste -> recipeTaste.getTaste())
                .collect(Collectors.toList());

        return CocktailRecipeSearchDTO.builder()
                .id(cocktailRecipe.getId())
                .name(cocktailRecipe.getName())
                .drinkImgPath(cocktailRecipe.getDrinkImgPath())
                .instruction(cocktailRecipe.getInstruction())
                .tastes(tastes)
                .build();
    }
}
