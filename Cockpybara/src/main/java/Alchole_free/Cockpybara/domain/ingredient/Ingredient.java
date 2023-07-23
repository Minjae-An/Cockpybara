package Alchole_free.Cockpybara.domain.ingredient;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;

    @Enumerated(EnumType.STRING)
    private IngredientCategory ingredientCategory;

    public Ingredient(String name, IngredientCategory ingredientCategory){
        this.name = name;
        this.ingredientCategory = ingredientCategory;
    }
}
