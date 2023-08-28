package Alchole_free.Cockpybara.controller.my_recipe.add_new_my_recipe;

import Alchole_free.Cockpybara.domain.cocktail_recipe.AlcoholicType;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Category;
import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Glass;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.RecipeTaste;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import Alchole_free.Cockpybara.domain.ingredient.Ingredient;
import Alchole_free.Cockpybara.domain.ingredient.RecipeIngredient;
import Alchole_free.Cockpybara.domain.ingredient.Unit;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Data
public class AddNewMyRecipeRequest {
    @NotNull
    @Length(max = 255)
    private String name;
    @NotNull
    private AlcoholicType alcoholicType;
    @NotNull
    private Category category;
    @NotNull
    private String drinkImgPath;
    @NotNull
    private Glass glass;
    @NotNull
    @Length(min = 20, max = 300)
    private String instruction;
    private Boolean isMemberRecipe;
    private LocalDateTime createdAt;

    @NotNull
    @Size(max = 3)
    private List<Taste> tastes;

    @NotNull
    @Size(min = 1, max = 15)
    private List<MyRecipeIngredientDTO> ingredients;

    public CocktailRecipe to() {
        CocktailRecipe cocktailRecipe = new CocktailRecipe(
                name,
                alcoholicType,
                category,
                drinkImgPath,
                glass,
                instruction,
                isMemberRecipe,
                createdAt
        );

        List<RecipeTaste> recipeTastes = tastes.stream().map(t -> new RecipeTaste(cocktailRecipe, t))
                .collect(Collectors.toList());

        cocktailRecipe.setTastes(recipeTastes);

        return cocktailRecipe;
    }
}
