package Alchole_free.Cockpybara.controller.likes.like_list;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class LikeDTO {
    private Long recipeId;
    private String name;
    private String drinkImgPath;
    private LocalDateTime createdAt;

    public LikeDTO(Long recipeId, String name, String drinkImgPath, LocalDateTime createdAt) {
        this.recipeId = recipeId;
        this.name = name;
        this.drinkImgPath = drinkImgPath;
        this.createdAt = createdAt;
    }
}
