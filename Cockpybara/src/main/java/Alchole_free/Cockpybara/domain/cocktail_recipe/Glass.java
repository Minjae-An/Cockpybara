package Alchole_free.Cockpybara.domain.cocktail_recipe;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public enum Glass {

    NONE(null),
    CHAMPAGNE_FLUTE("Champagne flute"),
    MARGARITA_COUPETTE_GLASS("Margarita/Coupette glass"),
    MASON_JAR("Mason jar"),
    OLD_FASHIONED_GLASS("Old-fashioned glass"),
    PUNCH_BOWL("Punch Bowl"),
    POUSSE_CAFE_GLASS("Pousse cafe glass"),
    COCKTAIL_GLASS("Cocktail Glass"),
    BEER_GLASS("Beer Glass"),
    WHISKEY_SOUR_GLASS("Whiskey sour glass"),
    BRANDY_SNIFTER("Brandy snifter"),
    COFFEE_MUG("Coffee mug"),
    HIGHBALL_GLASS("Highball Glass"),
    MARGARITA_GLASS("Margarita glass"),
    SHOT_GLASS("Shot Glass"),
    COLLINS_GLASS("Collins Glass"),
    WHITE_WINE_GLASS("White wine glass"),
    MARTINI_GLASS("Martini Glass"),
    CORDIAL_GLASS("Cordial glass"),
    BEER_PILSNER("Beer pilsner"),
    PINT_GLASS("Pint glass"),
    COPPER_MUG("Copper Mug"),
    PARFAIT_GLASS("Parfait glass"),
    IRISH_COFFEE_CUP("Irish coffee cup"),
    HURRICANE_GLASS("Hurricane glass"),
    WINE_GLASS("Wine Glass"),
    JAR("Jar"),
    BEER_MUG("Beer mug"),
    PITCHER("Pitcher");

    private final String name;

    Glass(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public static Map<String, Glass> getNameAndValues(){
        Glass[] values = Glass.values();
        Map<String, Glass> nameAndValues=new HashMap<>();
        Arrays.stream(values).forEach(v->nameAndValues.put(v.getName(), v));
        return nameAndValues;
    }
}

