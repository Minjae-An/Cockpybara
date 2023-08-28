package Alchole_free.Cockpybara.controller.review.commented_recipes;

import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class CommentedRecipesResponse {
    private final Long recipeId;
    private final String name;
    private final String drinkImgPath;
    private final LocalDateTime createdAt;

    public static CommentedRecipesResponse from(CocktailRecipe cocktailRecipe){
        return new CommentedRecipesResponse(
                cocktailRecipe.getId(),
                cocktailRecipe.getName(),
                cocktailRecipe.getDrinkImgPath(),
                cocktailRecipe.getCreatedAt()
        );
    }
}
