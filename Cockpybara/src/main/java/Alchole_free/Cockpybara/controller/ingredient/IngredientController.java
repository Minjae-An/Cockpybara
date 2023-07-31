package Alchole_free.Cockpybara.controller.ingredient;

import Alchole_free.Cockpybara.controller.ingredient.search_ingredient.SearchIngredientResponse;
import Alchole_free.Cockpybara.domain.ingredient.Ingredient;
import Alchole_free.Cockpybara.service.ingredient.IngredientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class IngredientController {
    private final IngredientService ingredientService;

    @GetMapping("/user/{userId}/my-recipe")
    public ResponseEntity<SearchIngredientResponse> searchIngredintsByName(String name){
        List<Ingredient> ingredients = ingredientService.findIngredientsByName(name);

        return ResponseEntity.ok(new SearchIngredientResponse(ingredients));
    }
}
