package Alchole_free.Cockpybara.controller.review.commented_recipes;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Getter
public class CommentedRecipesResponse {
    private final String name;
    private final String drinkImgPath;
    private final LocalDateTime createdAt;
}
