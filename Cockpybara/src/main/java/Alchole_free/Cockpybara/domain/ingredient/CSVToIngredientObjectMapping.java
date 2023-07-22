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

        String csvFile = "C:\\CockpyPj\\Cockpybara\\Cockpybara\\src\\main\\resources\\ingredients_list.csv";
        try (CSVReader reader = new CSVReader(new FileReader(csvFile))) {
            CsvToBean<Ingredient> csvToBean = new CsvToBeanBuilder<Ingredient>(reader)
                    .withType(Ingredient.class) // 매핑할 클래스 지정
                    .withIgnoreLeadingWhiteSpace(true) // 앞뒤 공백 무시
                    .build();

            List<Ingredient> ingredients = csvToBean.parse(); // CSV 데이터를 객체로 매핑

            // 재료당 단위를 담을 Map 생성
            Map<String, List<String>> ingredientUnitsMap = new HashMap<>();

            for (Ingredient ingredient : ingredients) {
                String ingredientName = ingredient.getName();
                // 재료명이 처음 나오는 경우, 새로운 List를 생성하여 단위 추가
                List<String> units = new ArrayList<>();
                ingredientUnitsMap.put(ingredientName, units);
            }

            // 재료와 단위 출력
            for (Map.Entry<String, List<String>> entry : ingredientUnitsMap.entrySet()) {
                String ingredientName = entry.getKey();
                List<String> units = entry.getValue();

                for (String unit : units) {
                    System.out.println(ingredientName + ", " + unit);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}