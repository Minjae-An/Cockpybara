package Alchole_free.Cockpybara.domain.ingredient;

import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import javax.persistence.*;

@Entity
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
    public RecipeIngredient() {
        // 기본 생성자
    }
    public RecipeIngredient(CocktailRecipe cocktailRecipe, Ingredient ingredient, Unit unit, Double quantity) {
        this.cocktailRecipe = cocktailRecipe;
        this.ingredient = ingredient;
        this.unit = unit;
        this.quantity = quantity;
    }

    //getter setter추가
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CocktailRecipe getCocktailRecipe() {
        return cocktailRecipe;
    }

    public void setCocktailRecipe(CocktailRecipe cocktailRecipe) {
        this.cocktailRecipe = cocktailRecipe;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

}
