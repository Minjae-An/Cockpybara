package Alchole_free.Cockpybara.domain.cocktail_recipe;

import Alchole_free.Cockpybara.domain.cocktail_recipe.review.Review;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class CocktailRecipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Enumerated(EnumType.STRING)
    private AlcoholicType alcoholicType;
    @Enumerated(EnumType.STRING)
    private Category category;

    private String drinkImgPath;

    @Enumerated(EnumType.STRING)
    private Glass glass;

    @Column(length = 850)
    private String instruction;
    private Boolean isMemberRecipe;

    @OneToMany(mappedBy = "cocktailRecipe")
    private List<Review> reviews;

    public CocktailRecipe(String name, AlcoholicType alcoholicType,
                          Category category, String drinkImgPath,
                          Glass glass, String instruction,
                          Boolean isMemberRecipe) {
        this.name = name;
        this.alcoholicType = alcoholicType;
        this.category = category;
        this.drinkImgPath = drinkImgPath;
        this.glass = glass;
        this.instruction = instruction;
        this.isMemberRecipe = isMemberRecipe;
    }
}
