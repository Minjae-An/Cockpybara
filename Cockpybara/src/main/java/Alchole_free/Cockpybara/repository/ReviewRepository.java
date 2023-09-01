package Alchole_free.Cockpybara.repository;

import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.cocktail_recipe.review.Review;
import Alchole_free.Cockpybara.domain.member.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findReviewByMember(Member member);
    Page<Review> findReviewByCocktailRecipe(CocktailRecipe cocktailRecipe, Pageable pageable);
}
