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
    private String unit;
    private String quantity;
    public RecipeIngredient() {
        // 기본 생성자
    }
    public RecipeIngredient(CocktailRecipe cocktailRecipe, Ingredient ingredient, String unit, String quantity) {
        this.cocktailRecipe = cocktailRecipe;
        this.ingredient = ingredient;
        this.unit = unit;
        this.quantity = quantity;
    }

    // Getter와 Setter 메소드 생략

    // 필요에 따라 다른 메소드 추가 가능
}
