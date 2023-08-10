package Alchole_free.Cockpybara.domain.cocktail_recipe.generator;

import Alchole_free.Cockpybara.domain.cocktail_recipe.*;
import Alchole_free.Cockpybara.domain.ingredient.*;
import Alchole_free.Cockpybara.repository.IngredientRepository;
import Alchole_free.Cockpybara.repository.cocktail_recipe.CocktailRecipeRepository;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@SpringBootTest
@Slf4j
public class CsvToCocktailRecipeMapping {
    @Autowired
    private CocktailRecipeRepository repository;

    @Autowired
    private IngredientRepository ingredientRepository;

    private final String path = "C:\\Cockpybara\\Cockpybara\\src" +
            "\\main\\resources\\refined_drinks.csv";

    //더미 데이터셋 insert를 위한 사전 삭제 작업
    @BeforeEach
    void setUp() {
        repository.deleteAll();
        ingredientRepository.deleteAll();
    }

    //더미 데이터셋 DB 정상 투입여부 확인
    @AfterEach
    void after() {
        log.info("inserted recipe data count = {}", repository.count());
        log.info("inserted ingredients data count = {}", ingredientRepository.count());

        int sum = 0;
        List<CocktailRecipe> all = repository.findAll();
        for (CocktailRecipe cocktailRecipe : all) {
            sum += cocktailRecipe.getIngredients().size();
        }

        log.info("inserted recipeIngredients data count = {}", sum);
    }

    @Test
    @Transactional
    @Commit
        // DB에 저장하고 싶지 않을 경우 이 애노테이션 주석 처리
    void saveCocktailRecipeAndRecipeIngredients() {
        List<Ingredient> ingredients = CSVToIngredientObjectMapping.getIngredients();
        ingredients.forEach(ingredient -> ingredientRepository.save(ingredient));

        String ingredientNameStr = "strIngredient";
        String measureStr = "strMeasure";

        Map<String, Integer> header = getHeader();

        Map<String, CocktailRecipe> nameRecipeMap = new HashMap<>();
        getCocktailRecipeFromCsv()
                .forEach(cocktailRecipe -> nameRecipeMap.put(cocktailRecipe.getName(), cocktailRecipe));

        Map<CocktailRecipe, List<RecipeIngredient>> recipeIngredientsMap = new HashMap<>();
        Integer nameIndex = header.get("strDrink");

        Map<String, Unit> unitMap = Unit.getNameAndValues();

        try (CSVReader reader = new CSVReader(new FileReader(path))) {
            String[] line;

            reader.readNext();
            StringTokenizer st;

            while ((line = reader.readNext()) != null) {
                String recipeName = line[nameIndex];
                CocktailRecipe cocktailRecipe = nameRecipeMap.get(recipeName);
                repository.save(cocktailRecipe); // persist를 위해 칵테일 레시피 먼저 저장

                recipeIngredientsMap.put(cocktailRecipe, new ArrayList<>());

                for (int i = 1; i <= 15; i++) {
                    String ingredientName = line[header.get(ingredientNameStr + i)];
                    String measureString = line[header.get(measureStr + i)];
                    if (!StringUtils.hasText(ingredientName) || !StringUtils.hasText(measureString) ||
                            ingredientName == null || measureString == null)
                        break;

                    double quantity;
                    Unit unit;

                    if (measureString.equals("fill") || measureString.equals("full glass") || measureString.equals("mikey bottle") ||
                            measureString.equals("70ml/2fl oz") || measureString.equals("0.2tsp count") || measureString.equals("about drop")) {
                        quantity = 0;
                        unit = Unit.FILL;
                    } else {
                        st = new StringTokenizer(measureString);
                        quantity = Double.parseDouble(st.nextToken());
                        unit = unitMap.get(st.nextToken());
                    }

                    Ingredient findIngredient = ingredientRepository.findByName(ingredientName).get();

                    recipeIngredientsMap.get(cocktailRecipe)
                            .add(new RecipeIngredient(cocktailRecipe, findIngredient, unit, quantity));
                }

                // recipeIngredientsMap 정보 바탕으로 cocktailRecipe-recipeIngredients 설정
                cocktailRecipe.setIngredients(recipeIngredientsMap.get(cocktailRecipe));
            }


        } catch (FileNotFoundException ex) {
            throw new RuntimeException(ex);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        } catch (CsvValidationException e) {
            throw new RuntimeException(e);
        }
    }


    private List<CocktailRecipe> getCocktailRecipeFromCsv() {
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

                list.add(cocktailRecipe);
            }

            List<CocktailRecipe> cocktailRecipes =
                    list.stream()
                            .map(cocktailRecipeForCsv -> CocktailRecipeForCsv.to(cocktailRecipeForCsv))
                            .collect(Collectors.toList());

            return cocktailRecipes;
        } catch (FileNotFoundException ex) {
            throw new RuntimeException(ex);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        } catch (CsvValidationException ex) {
            throw new RuntimeException(ex);
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

    private List<CocktailRecipe> getIngredients() {
        Map<String, Integer> header = getHeader();

        String ingredientNameStr = "strIngredient";
        String measureStr = "strMeasure";

        try (CSVReader reader = new CSVReader(new FileReader(path))) {
            String[] line;

            reader.readNext();

            List<String> ingredientNameList = header.keySet().stream()
                    .filter(key -> key.contains(ingredientNameStr))
                    .collect(Collectors.toList());

            List<String> measureList = header.keySet().stream()
                    .filter(key -> key.contains(measureStr))
                    .collect(Collectors.toList());

            Map<IngredientCategory, Unit[]> ingredientUnitMap =
                    IngredientUnitMap.createIngredientUnitMap();

            while ((line = reader.readNext()) != null) {
                line = reader.readNext();

            }


        } catch (FileNotFoundException ex) {
            throw new RuntimeException(ex);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        } catch (CsvValidationException e) {
            throw new RuntimeException(e);
        }

        StringTokenizer st;

        return null;
    }
}
