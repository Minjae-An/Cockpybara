package Alchole_free.Cockpybara.domain.ingredient;

import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "recipe_ingredient")
public class RecipeIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cocktail_recipe_id")
    private CocktailRecipe cocktailRecipe;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;
    @Enumerated(EnumType.STRING)
    private Unit unit;
    private Double quantity;  //일단은 실수로 설정
    public RecipeIngredient(CocktailRecipe cocktailRecipe, Ingredient ingredient, Unit unit, Double quantity) {
        this.cocktailRecipe = cocktailRecipe;
        this.ingredient = ingredient;
        this.unit = unit;
        this.quantity = quantity;
    }
}
