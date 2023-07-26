package Alchole_free.Cockpybara.domain.cocktail_recipe.review;

import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Review {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private CocktailRecipe cocktailRecipe;

    private Integer stars;

    private String review;
}
