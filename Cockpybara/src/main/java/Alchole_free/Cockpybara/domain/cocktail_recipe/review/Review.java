package Alchole_free.Cockpybara.domain.cocktail_recipe.review;

import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.member.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private CocktailRecipe cocktailRecipe;

    @ManyToOne
    private Member member;

    private Integer stars;

    private String review;

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReviewTaste> reviewTastes=new ArrayList<>();

    public Review(CocktailRecipe cocktailRecipe, Member member, Integer stars, String review) {
        this.cocktailRecipe = cocktailRecipe;
        this.member = member;
        this.stars = stars;
        this.review = review;
    }

    public void setReviewTastes(List<ReviewTaste> reviewTastes) {
        this.reviewTastes = reviewTastes;
    }
}
