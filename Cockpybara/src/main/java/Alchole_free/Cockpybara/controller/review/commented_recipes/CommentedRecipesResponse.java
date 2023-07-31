package Alchole_free.Cockpybara.controller.review.commented_recipes;

import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Getter
public class CommentedRecipesResponse {
    private final String name;
    private final String drinkImgPath;
    private final LocalDateTime createdAt;
}
