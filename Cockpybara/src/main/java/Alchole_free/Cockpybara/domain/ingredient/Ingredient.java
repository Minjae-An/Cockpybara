package Alchole_free.Cockpybara.domain.ingredient;

import lombok.AccessLevel;
import lombok.Getter;
import com.opencsv.bean.CsvBindByName;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)

public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CsvBindByName(column = "Ingredient")
    private String name;

    @Enumerated(EnumType.STRING)

    @CsvBindByName(column = "classification")
    private IngredientCategory ingredientCategory;

    public Ingredient(String name, IngredientCategory ingredientCategory){
        this.name = name;
        this.ingredientCategory = ingredientCategory;
    }

    public String getName() {
        return name;
    }
    public IngredientCategory getCategory() {
        return ingredientCategory;
    }
}
