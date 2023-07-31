package Alchole_free.Cockpybara.domain.cocktail_recipe;


import Alchole_free.Cockpybara.domain.cocktail_recipe.review.Review;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.RecipeTaste;

import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import Alchole_free.Cockpybara.domain.ingredient.RecipeIngredient;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "cocktailRecipe")
    @Size(max = 3)
    private List<RecipeTaste> tastes=new ArrayList<>();

    @OneToMany(mappedBy = "cocktailRecipe")
    private List<RecipeIngredient> ingredients;

    public CocktailRecipe(String name, AlcoholicType alcoholicType,
                          Category category, String drinkImgPath,
                          Glass glass, String instruction,
                          Boolean isMemberRecipe, LocalDateTime createdAt) {
        this.name = name;
        this.alcoholicType = alcoholicType;
        this.category = category;
        this.drinkImgPath = drinkImgPath;
        this.glass = glass;
        this.instruction = instruction;
        this.isMemberRecipe = isMemberRecipe;
        this.createdAt=createdAt;
    }

    public void setTastes(List<RecipeTaste> tastes) {
        this.tastes = tastes;
    }

    public void setIngredients(List<RecipeIngredient> ingredients) {
        this.ingredients = ingredients;
    }

    public void update(AlcoholicType alcoholicType, Category category, String drinkImgPath,
                       Glass glass, String instruction, List<Taste> tastes){
        this.alcoholicType=alcoholicType;
        this.category=category;
        this.drinkImgPath=drinkImgPath;
        this.glass=glass;
        this.instruction=instruction;

        this.tastes.clear();
        this.tastes=tastes.stream().map(t->new RecipeTaste(this, t))
                .collect(Collectors.toList());
    }
}
