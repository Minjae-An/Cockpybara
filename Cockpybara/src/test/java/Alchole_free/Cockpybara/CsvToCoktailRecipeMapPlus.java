package Alchole_free.Cockpybara;

import Alchole_free.Cockpybara.domain.cocktail_recipe.AlcoholicType;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Category;
import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipeForCsv;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Glass;
import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.ingredient.Unit;
import Alchole_free.Cockpybara.domain.ingredient.RecipeIngredient;
import Alchole_free.Cockpybara.domain.ingredient.Ingredient;
import Alchole_free.Cockpybara.repository.IngredientRepository;
import Alchole_free.Cockpybara.repository.cocktail_recipe.CocktailRecipeRepository;
import com.opencsv.CSVReader;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.exceptions.CsvValidationException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@SpringBootTest
@Transactional
public class CsvToCoktailRecipeMapPlus {
    @Autowired
    private CocktailRecipeRepository repository;

    private IngredientRepository ingredientRepository;

    private final String path = "C:\\Cockpybara\\Cockpybara\\src" +
            "\\main\\resources\\all_drinks.csv";

    @Test
//    @Rollback(value = false) 데이터 저장 필요시 이 구절 주석 해제
    void shouldSaveCocktailRecipes() {
        Map<String, Integer> header = getHeader();

        try (CSVReader reader = new CSVReader(new FileReader(path))) {
            String[] line;

            reader.readNext();

            Integer nameIndex = header.get("strDrink");
            Integer alcoholicIndex = header.get("strAlcoholic");
            Integer categoryIndex = header.get("strCategory");
            Integer imgPathIndex = header.get("strDrinkThumb");
            Integer glassIndex = header.get("strGlass");
            Integer instructionIndex = header.get("strInstructions");

            Map<String, AlcoholicType> alcoholicTypeMap = AlcoholicType.getNameAndValues();
            Map<String, Category> categoryMap = Category.getNameAndValues();
            Map<String, Glass> glassMap = Glass.getNameAndValues();
            Map<String, Unit> unitMap = Unit.getNameAndValues();

            List<Ingredient> ingredients = ingredientRepository.findAll();
            Map<String, Ingredient> ingredientMap = ingredients.stream()
                    .collect(Collectors.toMap(Ingredient::getName, Function.identity()));


            List<CocktailRecipeForCsv> list = new ArrayList<>();
            while ((line = reader.readNext()) != null) {
                CocktailRecipeForCsv cocktailRecipe = new CocktailRecipeForCsv();
                cocktailRecipe.setName(line[nameIndex]);
                cocktailRecipe.setAlcoholicType(alcoholicTypeMap.get(line[alcoholicIndex].toLowerCase()));
                cocktailRecipe.setCategory(categoryMap.get(line[categoryIndex].toLowerCase()));

                if (line[glassIndex].equals(null))
                    cocktailRecipe.setGlass(Glass.NONE);
                else
                    cocktailRecipe.setGlass(glassMap.get(line[glassIndex].toLowerCase()));

                cocktailRecipe.setDrinkImgPath(line[imgPathIndex]);
                cocktailRecipe.setInstruction(line[instructionIndex]);
                cocktailRecipe.setIsMemberRecipe(false);
                cocktailRecipe.setCreatedAt(LocalDateTime.now());

                for (int i = 1; i <= 15; i++) {
                    String ingredientKey = "strIngredient" + i;
                    String measureKey = "strMeasure" + i;

                    String ingredientName = line[header.get(ingredientKey)];
                    String measureValue = line[header.get(measureKey)];

                    if (measureValue != null && !measureValue.trim().isEmpty()) {
                        // Check if measureValue is not "fill"
                        if (!measureValue.equalsIgnoreCase("fill")) {
                            RecipeIngredient recipeIngredient = new RecipeIngredient();

                            // Set ingredient using ingredientMap
                            Ingredient ingredient = ingredientMap.get(ingredientName);
                            if (ingredient != null) {
                                recipeIngredient.setIngredient(ingredient);
                            }

                            // Extract unit and quantity from measureValue
                            String[] measureParts = measureValue.split(" ");
                            if (measureParts.length >= 2) {
                                String unitName = measureParts[1];
                                Unit unit = unitMap.get(unitName);
                                recipeIngredient.setUnit(unit);

                                try {
                                    double quantity = Double.parseDouble(measureParts[0]);
                                    recipeIngredient.setQuantity(quantity);
                                } catch (NumberFormatException e) {
                                    recipeIngredient.setQuantity(null);
                                }
                            }
                            else {
                                recipeIngredient.setUnit(null);
                                recipeIngredient.setQuantity(null);
                            }

                            // Add the recipeIngredient to the list
                            cocktailRecipe.getIngredients().add(recipeIngredient);
                        } else {
                            // Handle the case where measureValue is "fill"
                            RecipeIngredient recipeIngredient = new RecipeIngredient();
                            recipeIngredient.setIngredient(null);
                            recipeIngredient.setMeasureValue("");
                            recipeIngredient.setUnit(null);

                            // Add the recipeIngredient to the list
                            cocktailRecipe.getIngredients().add(recipeIngredient);
                        }
                    } else {
                        // Handle the case where measureValue is null or empty
                        RecipeIngredient recipeIngredient = new RecipeIngredient();
                        recipeIngredient.setIngredient(null);
                        recipeIngredient.setMeasureValue("");
                        recipeIngredient.setUnit(null);

                        // Add the recipeIngredient to the list
                        cocktailRecipe.getIngredients().add(recipeIngredient);
                    }
                }



                list.add(cocktailRecipe);
            }

            List<CocktailRecipe> cocktailRecipes = list.stream().map(cocktailRecipeForCsv -> CocktailRecipeForCsv.to(cocktailRecipeForCsv))
                    .collect(Collectors.toList());

            cocktailRecipes.forEach(cr -> repository.save(cr));


        } catch (IOException | CsvValidationException e) {
            e.printStackTrace();
        }

    }

    private Map<String, Integer> getHeader() {
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


    private List<CocktailRecipeForCsv> getMappedCocktailRecipes() {
        try (CSVReader reader = new CSVReader(new FileReader(path))) {
            CsvToBean<CocktailRecipeForCsv> csvToBean = new CsvToBeanBuilder<CocktailRecipeForCsv>(reader)
                    .withType(CocktailRecipeForCsv.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build();

            List<CocktailRecipeForCsv> parse = csvToBean.parse();
            parse.forEach(cr -> {
                cr.setIsMemberRecipe(false);
                cr.setCreatedAt(LocalDateTime.now());
            });

            return parse;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    //예외적인 부분처리 - 메서드 수정하거나 없애거나해야함
    private String extractUnitName(String measureValue) {
        return "";
    }
}
