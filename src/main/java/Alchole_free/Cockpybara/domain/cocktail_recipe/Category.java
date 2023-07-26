package Alchole_free.Cockpybara.domain.cocktail_recipe;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public enum Category {
    OTHER_UNKNOWN("Other/Unknown"),
    ORDINARY_DRINK("Ordinary Drink"),
    HOMEMADE_LIQUEUR("Homemade Liqueur"),
    PUNCH_PARTY_DRINK("Punch / Party Drink"),
    COFFEE_TEA("Coffee / Tea"),
    COCKTAIL("Cocktail"),
    SOFT_DRINK_SODA("Soft Drink / Soda"),
    SHOT("Shot"),
    COCOA("Cocoa"),
    MILK_FLOAT_SHAKE("Milk / Float / Shake"),
    BEER("Beer");

    private final String name;

    Category(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public static Map<String, Category> getNameAndValues(){
        Category[] values = Category.values();
        Map<String, Category> nameAndValues=new HashMap<>();
        Arrays.stream(values).forEach(v->nameAndValues.put(v.getName(), v));
        return nameAndValues;
    }
}
