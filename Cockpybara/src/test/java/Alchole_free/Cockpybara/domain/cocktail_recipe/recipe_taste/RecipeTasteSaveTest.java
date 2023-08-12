package Alchole_free.Cockpybara.domain.cocktail_recipe.recipe_taste;

import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.RecipeTaste;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import Alchole_free.Cockpybara.repository.cocktail_recipe.CocktailRecipeRepository;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Before;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.test.context.event.annotation.BeforeTestExecution;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

@SpringBootTest
@Slf4j
public class RecipeTasteSaveTest {
    @Autowired
    private CocktailRecipeRepository cocktailRecipeRepository;

    @BeforeEach
    public void before(){
        List<CocktailRecipe> all = cocktailRecipeRepository.findAll();
        all.forEach(cocktailRecipe -> cocktailRecipe.getTastes().clear());
    }

    @Test
    @Transactional
    @Commit
    void saveRecipeTaste(){
        List<CocktailRecipe> all =
                cocktailRecipeRepository.findAll();

        log.info("all size = {}", all.size());

        all.forEach(cocktailRecipe ->{
            List<Taste> tastes = getRandomTastes();
            tastes.forEach(taste -> cocktailRecipe.getTastes().add(new RecipeTaste(cocktailRecipe, taste)));
        });

        Integer sum = all.stream()
                .map(cocktailRecipe -> cocktailRecipe.getTastes().size())
                .reduce(0, (s1, s2) -> s1 + s2);
        Assertions.assertThat(sum).isEqualTo(3*all.size());
    }

    private List<Taste> getRandomTastes(){
        Set<Taste> tasteSet=new HashSet<>();
        Taste[] values = Taste.values();
        int index;

        Random random = new Random();

        while(tasteSet.size()<3){
            index= random.nextInt(values.length);
            tasteSet.add(values[index]);
        }

        return tasteSet.stream().collect(Collectors.toList());
    }
}
