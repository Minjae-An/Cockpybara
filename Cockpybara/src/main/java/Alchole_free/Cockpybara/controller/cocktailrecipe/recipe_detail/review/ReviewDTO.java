package Alchole_free.Cockpybara.controller.cocktailrecipe.recipe_detail.review;

import lombok.Getter;

@Getter
public class ReviewDTO {
    private Long id;
    private Long memberId;
    private Integer stars;
    private String review;

    public ReviewDTO(Long id, Long memberId, Integer stars, String review) {
        this.id = id;
        this.memberId = memberId;
        this.stars = stars;
        this.review = review;
    }
}
