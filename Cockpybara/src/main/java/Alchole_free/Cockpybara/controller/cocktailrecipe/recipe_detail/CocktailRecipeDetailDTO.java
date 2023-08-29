package Alchole_free.Cockpybara.controller.cocktailrecipe.recipe_detail;

import Alchole_free.Cockpybara.controller.cocktailrecipe.recipe_detail.ingredient.IngredientDTO;
import Alchole_free.Cockpybara.controller.cocktailrecipe.recipe_detail.review.ReviewDTO;
import Alchole_free.Cockpybara.domain.cocktail_recipe.AlcoholicType;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Category;
import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Glass;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import Alchole_free.Cockpybara.domain.ingredient.Unit;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class CocktailRecipeDetailDTO {
    private Long id;
    private String name;
    private AlcoholicType alcoholicType;
    private Category category;
    private String drinkImgPath;
    private Glass glass;
    private String instruction;
    private Boolean isMemberRecipe;

    private List<ReviewDTO> reviews;
    private LocalDateTime createdAt;
    private List<Taste> tastes;
    private List<IngredientDTO> ingredients;


    public static CocktailRecipeDetailDTO from(CocktailRecipe cocktailRecipe) {
        List<ReviewDTO> reviews = cocktailRecipe.getReviews()
                .stream().map(review -> {
                    ReviewDTO reviewDTO = new ReviewDTO(review.getId(), review.getMember().getId(),
                            review.getStars(), review.getReview());
                    List<Taste> tastes = review.getReviewTastes().stream().map(reviewTaste -> reviewTaste.getTaste())
                            .collect(Collectors.toList());
                    reviewDTO.setTastes(tastes);
                    return reviewDTO;
                })
                .collect(Collectors.toList());

        List<Taste> tastes = cocktailRecipe.getTastes()
                .stream().map(recipeTaste -> recipeTaste.getTaste())
                .collect(Collectors.toList());
        List<IngredientDTO> ingredients = cocktailRecipe.getIngredients()
                .stream().map(recipeIngredient -> {
                    String name = recipeIngredient.getIngredient().getName();
                    Double quantity = recipeIngredient.getQuantity();
                    Unit unit = recipeIngredient.getUnit();

                    return new IngredientDTO(name, quantity, unit);
                }).collect(Collectors.toList());


        return CocktailRecipeDetailDTO.builder()
                .id(cocktailRecipe.getId())
                .name(cocktailRecipe.getName())
                .alcoholicType(cocktailRecipe.getAlcoholicType())
                .category(cocktailRecipe.getCategory())
                .drinkImgPath(cocktailRecipe.getDrinkImgPath())
                .glass(cocktailRecipe.getGlass())
                .instruction(cocktailRecipe.getInstruction())
                .isMemberRecipe(cocktailRecipe.getIsMemberRecipe())
                .createdAt(cocktailRecipe.getCreatedAt())
                .reviews(reviews)
                .tastes(tastes)
                .ingredients(ingredients)
                .build();
    }
}
