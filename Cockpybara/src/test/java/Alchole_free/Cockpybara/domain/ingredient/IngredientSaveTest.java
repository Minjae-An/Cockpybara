package Alchole_free.Cockpybara.domain.ingredient;

import Alchole_free.Cockpybara.domain.ingredient.generator.IngredientGenerator;
import Alchole_free.Cockpybara.repository.IngredientRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class IngredientSaveTest {
    @Autowired
    private IngredientRepository ingredientRepository;

    @Test
    void shouldParseIngredientDummy(){
        List<Ingredient> ingredientDummyData =
                IngredientGenerator.getIngredientDummyData();

        ingredientDummyData.forEach(ingredient -> {
            System.out.println(ingredient.getName()+" "+ingredient.getIngredientCategory());
        });
    }

    @Test
    void shouldSaveIngredientData(){
        List<Ingredient> ingredientDummyData = IngredientGenerator.getIngredientDummyData();
        ingredientDummyData.forEach(ingredient -> ingredientRepository.save(ingredient));

        List<Ingredient> all = ingredientRepository.findAll();
        ingredientDummyData.equals(all);
    }
}
