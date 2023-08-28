package Alchole_free.Cockpybara.controller.my_recipe.add_new_my_recipe;

import Alchole_free.Cockpybara.domain.ingredient.IngredientCategory;
import Alchole_free.Cockpybara.domain.ingredient.Unit;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class MyRecipeIngredientDTO {
    private final String name;
    private final IngredientCategory ingredientCategory;
    private final Double quantity;
    private final Unit unit;

    //파싱 오류롤 인해 @JsonProperty 애노테이션을 통해 생성자 정의
    public MyRecipeIngredientDTO(@JsonProperty("name") String name,
                                 @JsonProperty("ingredientCategory") IngredientCategory ingredientCategory,
                                 @JsonProperty("quantity") Double quantity,
                                 @JsonProperty("unit") Unit unit) {
        this.name = name;
        this.ingredientCategory = ingredientCategory;
        this.quantity = quantity;
        this.unit = unit;
    }
}
