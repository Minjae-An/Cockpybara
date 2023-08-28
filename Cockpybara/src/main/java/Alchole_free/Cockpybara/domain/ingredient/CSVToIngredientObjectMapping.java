package Alchole_free.Cockpybara.domain.ingredient;

//import Alchole_free.Cockpybara.repository.IngredientRepository;

import com.opencsv.CSVReader;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.exceptions.CsvValidationException;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CSVToIngredientObjectMapping {
    private static final String path="C:\\Cockpybara\\Cockpybara\\src\\main\\resources\\ingredients_classification.csv";

    public static List<Ingredient> getIngredients() {

        Map<String, Integer> header = getHeader();

        try (CSVReader reader = new CSVReader(new FileReader(path))) {
            String[] line;

            reader.readNext();

            Integer nameIndex = header.get("Ingredient");
            Integer classificationIndex = header.get("classification");

            Map<String, IngredientCategory> nameAndValues = IngredientCategory.getNameAndValues();
            List<Ingredient> ingredients=new ArrayList<>();

            while((line=reader.readNext())!=null){
                String name = line[nameIndex];
                IngredientCategory ingredientCategory = nameAndValues.get(line[classificationIndex]);

                Ingredient ingredient = new Ingredient(name, ingredientCategory);
                ingredients.add(ingredient);
            }

            return ingredients;

        } catch (IOException e) {
            e.printStackTrace();
        } catch (CsvValidationException e) {
            throw new RuntimeException(e);
        }

        return null;
    }

    private static Map<String, Integer> getHeader() {
        try (CSVReader reader = new CSVReader(new FileReader(path))) {
            String[] header;
            header = reader.readNext();

            Map<String, Integer> map = new HashMap<>();

            for (int i = 0; i < header.length; i++) {
                map.put(header[i], i);
            }

            return map;

        } catch (IOException | CsvValidationException e) {
            e.printStackTrace();
        }

        return null;
    }
}