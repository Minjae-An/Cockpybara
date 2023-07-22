package Alchole_free.Cockpybara.domain.ingredient;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@Getter
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String ingredientCategory;
    public Ingredient(String name) {
        this.name = name;
    }

    // Getter and Setter methods
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {this.name = name;}
    public String getIngredientCategory() {
        return ingredientCategory;
    }

    public void setIngredientCategory(String ingredientCategory) {
        this.ingredientCategory = ingredientCategory;
    }
}
