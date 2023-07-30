package Alchole_free.Cockpybara.domain.ingredient;

import java.util.HashMap;
import java.util.Map;

public class IngredientUnitMap {
    public static Map<IngredientCategory, String[]> createIngredientUnitMap() {
        Map<IngredientCategory, String[]> ingredientUnitMap = new HashMap<>();

        // Add units for each ingredient category
        ingredientUnitMap.put(IngredientCategory.LIQUID, new String[]{"ml", "oz"});
        ingredientUnitMap.put(IngredientCategory.FRUIT, new String[]{"piece", "slice"});
        ingredientUnitMap.put(IngredientCategory.SYRUP, new String[]{"ml", "tbsp"});
        ingredientUnitMap.put(IngredientCategory.ETC, new String[]{"g", "tsp"});

        return ingredientUnitMap;
    }
}

