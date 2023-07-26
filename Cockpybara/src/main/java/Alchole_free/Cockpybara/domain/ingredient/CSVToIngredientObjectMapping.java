package Alchole_free.Cockpybara.domain.ingredient;

//import Alchole_free.Cockpybara.repository.IngredientRepository;
import com.opencsv.CSVReader;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CSVToIngredientObjectMapping {
    public static void main(String[] args) {

        String csvFile = "C:\\CockpyPj\\Cockpybara\\Cockpybara\\src\\main\\resources\\ingredients_classification.csv";
        try (CSVReader reader = new CSVReader(new FileReader(csvFile))) {
            CsvToBean<Ingredient> csvToBean = new CsvToBeanBuilder<Ingredient>(reader)
                    .withType(Ingredient.class) // 매핑할 클래스 지정
                    .withIgnoreLeadingWhiteSpace(true) // 앞뒤 공백 무시
                    .build();

            List<Ingredient> ingredients = csvToBean.parse(); // CSV 데이터를 객체로 매핑

            for (Ingredient ingredient : ingredients) {
                System.out.println("Ingredient Name: " + ingredient.getName());
                System.out.println("Ingredient Category: " + ingredient.getCategory());
                System.out.println("===================================");
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}