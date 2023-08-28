package Alchole_free.Cockpybara.repository;

import Alchole_free.Cockpybara.domain.ingredient.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    public List<Ingredient> findIngredientByNameContaining(String name);
    public Optional<Ingredient> findByName(String name);
}

