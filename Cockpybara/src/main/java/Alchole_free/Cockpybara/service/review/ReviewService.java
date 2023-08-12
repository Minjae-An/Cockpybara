package Alchole_free.Cockpybara.service.review;

import Alchole_free.Cockpybara.controller.review.commented_recipes.CommentedRecipesResponse;
import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.cocktail_recipe.review.Review;
import Alchole_free.Cockpybara.domain.member.Member;
import Alchole_free.Cockpybara.repository.cocktail_recipe.CocktailRecipeRepository;
import Alchole_free.Cockpybara.repository.MemberRepository;
import Alchole_free.Cockpybara.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewService {
    private final CocktailRecipeRepository cocktailRecipeRepository;
    private final MemberRepository memberRepository;
    private final ReviewRepository reviewRepository;

    public void addReview(Long recipeId, Long memberId, Integer stars, String review) {
        CocktailRecipe cocktailRecipe = cocktailRecipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalStateException("해당 레시피가 존재하지 않습니다."));
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalStateException("해당 멤버가 존재하지 않습니다."));

        Review newReview = new Review(cocktailRecipe, member, stars, review);

        cocktailRecipe.getReviews().add(newReview);
    }

    public void deleteReview(Long recipeId, Long reviewId) {
        CocktailRecipe cocktailRecipe = cocktailRecipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalStateException("해당 레시피가 존재하지 않습니다."));
        cocktailRecipe.getReviews().removeIf(review -> review.getId().equals(reviewId));
    }

    @Transactional(readOnly = true)
    public List<CommentedRecipesResponse> findCommentedRecipesByMember(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalStateException("해당 멤버가 존재하지 않습니다."));

        List<Review> reviews = reviewRepository.findReviewByMember(member);
        return reviews.stream()
                .map(review -> CommentedRecipesResponse.from(review.getCocktailRecipe()))
                .collect(Collectors.toList());
    }
}
