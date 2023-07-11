package Alchole_free.Cockpybara.domain.cocktail_recipe;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public enum AlcoholicType {
    OPTIONAL_ALCOHOL("optional alcohol"),
    NON_ALCOHOLIC("non alcoholic"),
    ALCOHOLIC("alcoholic");

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
        Arrays.stream(values).forEach(v->nameAndValues.put(v.getName(), v));
        return nameAndValues;
    }
}
