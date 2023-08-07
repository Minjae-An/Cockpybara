package Alchole_free.Cockpybara.domain;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public enum AlcoholicType {
    OPTIONAL_ALCOHOL("Optional Alcohol"),
    NON_ALCOHOLIC("Non Alcoholic"),
    ALCOHOLIC("Alcoholic");

    private final String name;

    AlcoholicType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public static Map<String, AlcoholicType> getNameAndValues(){
        AlcoholicType[] values = AlcoholicType.values();
        Map<String, AlcoholicType> nameAndValues=new HashMap<>();
        Arrays.stream(values).forEach(v->nameAndValues.put(v.getName().toLowerCase(), v));
        return nameAndValues;
    }
}
