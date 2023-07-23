package Alchole_free.Cockpybara.domain.ingredient;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public enum IngredientCategory {
    LIQUID("liquid"),
    FRUIT("fruit"),
    SYRUP("syrup"),
    ETC("etc");

    private final String name;

    IngredientCategory(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
    public static Map<String, IngredientCategory> getNameAndValues() {
        IngredientCategory[] values = IngredientCategory.values();
        Map<String, IngredientCategory>nameAndValues = new HashMap<>();
        Arrays.stream(values).forEach(v -> nameAndValues.put(v.getName(), v));
        return nameAndValues;
    }
}
