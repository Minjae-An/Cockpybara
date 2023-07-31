package Alchole_free.Cockpybara.service.ingredient;

import Alchole_free.Cockpybara.domain.ingredient.Ingredient;
import Alchole_free.Cockpybara.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class IngredientService {
    private final IngredientRepository ingredientRepository;

    public List<Ingredient> findIngredientsByName(String name){
        return ingredientRepository.findIngredientByNameContaining(name);
    }
}
