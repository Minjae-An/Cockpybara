package Alchole_free.Cockpybara.domain.ingredient;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public enum Unit {
    DROP("drop"),
    GLASS("glass"),
    SCOOP("scoop"),
    PART("part"),
    LITER("liter"),
    COUNT("count"),
    OZ("oz"),
    BOTTLE("bottle"),
    GR("gr"),
    TBLSP("tblsp"),
    FILL("fill"),
    TSP("tsp"),
    CAN("can"),
    GAL("gal"),
    SLICE("slice"),
    PIECE("piece"),
    LB("lb"),
    STICK("stick"),
    INCH("inch"),
    DASH("dash"),
    CUP("cup"),
    ML("ml");

    private final String name;

    Unit(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
    public static Map<String, Unit> getNameAndValues() {
        Unit[] values = Unit.values();
        Map<String, Unit> nameAndValues = new HashMap<>();
        Arrays.stream(values).forEach(v -> nameAndValues.put(v.getName(), v));
        return nameAndValues;
    }
}

