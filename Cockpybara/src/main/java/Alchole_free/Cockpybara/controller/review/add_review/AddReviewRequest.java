package Alchole_free.Cockpybara.controller.review.add_review;

import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
public class AddReviewRequest {
    @NotNull
    @Max(value = 5)
    private Integer stars;

    @NotNull
    @Length(max = 200)
    private String review;

    @NotNull
    @Size(min = 3, max = 3)
    private List<Taste> tastes;
}
