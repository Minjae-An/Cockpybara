package Alchole_free.Cockpybara.domain.cocktail_recipe.taste;

import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class RecipeTaste {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name="cocktail_recipe_id")
    private CocktailRecipe cocktailRecipe;

    @Enumerated(value = EnumType.STRING)
    private Taste taste;

    public RecipeTaste(CocktailRecipe cocktailRecipe, Taste taste) {
        this.cocktailRecipe = cocktailRecipe;
        this.taste = taste;
    }
}
