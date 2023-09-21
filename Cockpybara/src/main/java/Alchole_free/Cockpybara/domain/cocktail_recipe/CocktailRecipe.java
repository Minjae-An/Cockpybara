package Alchole_free.Cockpybara.domain.cocktail_recipe;


import Alchole_free.Cockpybara.domain.cocktail_recipe.review.Review;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.RecipeTaste;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import Alchole_free.Cockpybara.domain.ingredient.RecipeIngredient;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
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


    @OneToMany(mappedBy = "cocktailRecipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

    @CreatedDate
    @Column(updatable = false)  //처음 생성 이후로 LocalDateTime 수정 불가능
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "cocktailRecipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @Size(max = 3)
    private List<RecipeTaste> tastes=new ArrayList<>();

    @OneToMany(mappedBy = "cocktailRecipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecipeIngredient> ingredients=new ArrayList<>();


    private int likes=0;

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
        this.tastes.clear();
        this.tastes.addAll(tastes);
    }

    public void setIngredients(List<RecipeIngredient> ingredients) {
        this.ingredients.clear();
        this.ingredients.addAll(ingredients);
    }

    public void update(AlcoholicType alcoholicType, Category category, String drinkImgPath,
                       Glass glass, String instruction, List<Taste> tastes){
        this.alcoholicType=alcoholicType;
        this.category=category;
        this.drinkImgPath=drinkImgPath;
        this.glass=glass;
        this.instruction=instruction;

        this.tastes.clear();
        tastes.forEach(taste -> this.tastes.add(new RecipeTaste(this, taste)));
    }

    public void increaseLikes(){
        likes++;
    }

    public void decreaseLikes(){
        likes= Math.max(likes - 1, 0);
    }
}
