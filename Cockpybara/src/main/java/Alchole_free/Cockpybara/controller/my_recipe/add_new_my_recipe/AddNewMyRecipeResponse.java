package Alchole_free.Cockpybara.controller.my_recipe.add_new_my_recipe;

import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class AddNewMyRecipeResponse {
    private Long id;
    private String drinkImgPath;
    private String instruction;
    private LocalDateTime createdAt;
    private List<Taste> tastes;

    public static AddNewMyRecipeResponse from(CocktailRecipe cocktailRecipe) {
        Long id = cocktailRecipe.getId();
        String drinkImgPath = cocktailRecipe.getDrinkImgPath();
        String instruction = cocktailRecipe.getInstruction();
        LocalDateTime createdAt = cocktailRecipe.getCreatedAt();
        List<Taste> tastes = cocktailRecipe.getTastes().stream().map(recipeTaste -> recipeTaste.getTaste())
                .collect(Collectors.toList());

        return AddNewMyRecipeResponse.builder()
                .id(id)
                .drinkImgPath(drinkImgPath)
                .instruction(instruction)
                .createdAt(createdAt)
                .tastes(tastes).build();

    }
}
