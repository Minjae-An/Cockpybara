package Alchole_free.Cockpybara.controller.review.add_review;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;

@Data
public class AddReviewRequest {
    @NotNull
    @Max(value = 5)
    private Integer stars;

    @NotNull
    @Length(max = 200)
    private String review;
}
