package Alchole_free.Cockpybara.controller.cocktailrecipe.recipe_detail.review;

import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import lombok.Getter;

import java.util.List;

@Getter
public class ReviewDTO {
    private Long id;
    private Long memberId;
    private Integer stars;
    private String review;
    private List<Taste> tastes;
    private String imageUrl;

    public ReviewDTO(Long id, Long memberId, Integer stars, String review, String imageUrl) {
        this.id = id;
        this.memberId = memberId;
        this.stars = stars;
        this.review = review;
        this.imageUrl = imageUrl;
    }

    public void setTastes(List<Taste> tastes) {
        this.tastes = tastes;
    }
}
