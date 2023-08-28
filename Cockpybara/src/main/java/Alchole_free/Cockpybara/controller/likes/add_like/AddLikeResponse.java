package Alchole_free.Cockpybara.controller.likes.add_like;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class AddLikeResponse {
    private final Long memberId;
    private final Long cocktailRecipeId;
}
