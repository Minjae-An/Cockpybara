package Alchole_free.Cockpybra.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import Alchole_free.Cockpybra.repository.IngredientsRepository;
import java.util.ArrayList;
import java.util.List;

@Service
public class IngredientsService {
    private final IngredientsRepository ingredientsRepository;

    @Autowired
    public IngredientsService(IngredientsRepository ingredientsRepository) {
        this.ingredientsRepository = ingredientsRepository;
    }

    public List<String> getFilteredIngredients() {
        // Repository를 통해 정제된 재료 데이터를 가져옵니다.
        List<String> allIngredients = ingredientsRepository.getAllIngredients();

        // 일정 필터에 맞게 재료를 정리합니다.
        List<String> filteredIngredients = new ArrayList<>();
        for (String ingredient : allIngredients) {
            // 필터링 로직을 적용하여 원하는 조건에 해당하는 재료만 filteredIngredients에 추가합니다.
            // 예시: 재료의 이름이 특정 조건을 만족하면 filteredIngredients에 추가합니다.
            if (ingredient.contains("조건")) {
                filteredIngredients.add(ingredient);
            }
        }
        return filteredIngredients;
    }
}
