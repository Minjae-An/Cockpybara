package Alchole_free.Cockpybara.domain.ingredient;

import lombok.Getter;
import com.opencsv.bean.CsvBindByName;

import javax.persistence.*;

@Entity
@Getter
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @CsvBindByName(column = "Ingredient")
    private String name;

    @Enumerated(EnumType.STRING)

    @CsvBindByName(column = "classification")
    private IngredientCategory ingredientCategory;

    // 기본 생성자 추가
    public Ingredient() {
    }

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
