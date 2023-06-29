package Alchole_free.Cockpybara.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;
@RestController
public class CocktailController {
    private final IngredientsService ingredientsService;
    @GetMapping("cocktail/option-list")
    //받아오는 부분이랑 되돌려주는 값 변경해야함
    public String helloString(@PathVariable String id) {

        return "id is : " + id;
    }
}