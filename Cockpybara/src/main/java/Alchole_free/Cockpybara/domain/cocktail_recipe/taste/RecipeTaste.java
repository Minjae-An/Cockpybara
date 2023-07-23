package Alchole_free.Cockpybara.domain.cocktail_recipe.taste;

import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecipeTaste {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name="COCKTAILRECIPE_ID")
    private CocktailRecipe cocktailRecipe;

    @Enumerated(value = EnumType.STRING)
    private Taste taste;
}
