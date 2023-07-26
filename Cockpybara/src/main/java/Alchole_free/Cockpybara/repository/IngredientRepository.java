package Alchole_free.Cockpybara.repository;

import Alchole_free.Cockpybara.domain.ingredient.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    //추가적인 메소드 선언
}

