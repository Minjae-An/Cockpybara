package Alchole_free.Cockpybara.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import Alchole_free.Cockpybra.service.IngredientsService;

@RestController
@RequestMapping("/cocktail")
public class CocktailController {
    private final IngredientsService ingredientsService;

    @Autowired
    public CocktailController(IngredientsService ingredientsService) {
        this.ingredientsService = ingredientsService;
    }

    @GetMapping("/option-list")
    public List<String> getFilteredIngredients() {
        // 재료 필터링 작업을 수행하고, 필터링된 재료 리스트를 반환하는 서비스 메소드 호출
        List<String> filteredIngredients = ingredientsService.getFilteredIngredients();

        return filteredIngredients;
    }
}