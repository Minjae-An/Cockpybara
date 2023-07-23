package Alchole_free.Cockpybara.domain.member.likes;

import Alchole_free.Cockpybara.domain.Member;
import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "likes")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Member member;

    @ManyToOne
    private CocktailRecipe cocktailRecipe;
}
