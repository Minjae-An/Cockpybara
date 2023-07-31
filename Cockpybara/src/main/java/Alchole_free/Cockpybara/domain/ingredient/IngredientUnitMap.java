package Alchole_free.Cockpybara.domain.ingredient;

import java.util.HashMap;
import java.util.Map;

public class IngredientUnitMap {
    public static Map<IngredientCategory, String[]> createIngredientUnitMap() {
        Map<IngredientCategory, String[]> ingredientUnitMap = new HashMap<>();

        //각 카테고리별 해당 단위 맵 리턴
        ingredientUnitMap.put(IngredientCategory.LIQUID, new String[]{"fill", "oz", "part", "liter", "count", "ml", "dash", "drop", "tsp", "cup", "glass", "bottle", "slice", "tblsp", "can", "gal"});
        ingredientUnitMap.put(IngredientCategory.FRUIT, new String[]{"count", "cup", "piece", "fill", "gr", "slice", "part", "lb", "tblsp", "oz"});
        ingredientUnitMap.put(IngredientCategory.SYRUP, new String[]{"fill", "tsp", "oz", "drop", "gr", "tblsp", "part", "dash", "count", "cup", "ml"});
        ingredientUnitMap.put(IngredientCategory.ETC, new String[]{"piece", "tblsp", "tsp", "ml", "count", "oz", "inch", "dash", "gr", "stick", "fill", "cup", "part", "glass", "scoop", "slice"});

        return ingredientUnitMap;
    }
}

