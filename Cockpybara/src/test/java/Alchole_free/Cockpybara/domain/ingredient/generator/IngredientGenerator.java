package Alchole_free.Cockpybara.domain.ingredient.generator;

import Alchole_free.Cockpybara.domain.ingredient.Ingredient;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public abstract class IngredientGenerator {
    private static final String path =
            "C:\\Cockpybara\\Cockpybara\\src\\test\\resource\\ingredient_mock_data.json";

    public static List<Ingredient> getIngredientDummyData() {
        try {
            File file = new File(path);
            ObjectMapper objectMapper = new ObjectMapper();
            List<Ingredient> ingredients = Arrays.stream(objectMapper.readValue(file, Ingredient[].class)).collect(Collectors.toList());
            return ingredients;
        } catch (StreamReadException e) {
            throw new RuntimeException(e);
        } catch (DatabindException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
