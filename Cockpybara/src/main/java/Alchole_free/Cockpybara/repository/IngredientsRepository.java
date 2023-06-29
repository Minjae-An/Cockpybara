package Alchole_free.Cockpybra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import Alchole_free.Cockpybra.model.Ingredient;
@Repository
public interface IngredientsRepository extends JpaRepository<Ingredient, Long> {
    //추가 쿼리 메소드 밑에 작성
}