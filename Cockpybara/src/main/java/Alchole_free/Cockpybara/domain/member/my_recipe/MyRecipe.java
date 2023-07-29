package Alchole_free.Cockpybara.domain.member.my_recipe;

import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.member.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MyRecipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Member member;

    @ManyToOne
    private CocktailRecipe cocktailRecipe;

    public MyRecipe(Member member, CocktailRecipe cocktailRecipe) {
        this.member = member;
        this.cocktailRecipe = cocktailRecipe;
    }
}
