package Alchole_free.Cockpybara.controller.cocktailrecipe.recipe_detail.ingredient;

import Alchole_free.Cockpybara.domain.ingredient.Unit;
import lombok.Getter;

@Getter
public class IngredientDTO {
    private String name;

    private Double quantity;
    private Unit unit;

    public IngredientDTO(String name, Double quantity, Unit unit) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }
}
