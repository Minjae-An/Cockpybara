package Alchole_free.Cockpybara.controller.my_recipe.my_recipes;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class MyRecipeDTO {
    private Long id;
    private String name;
    private String drinkImgPath;
    private LocalDateTime createdAt;

    public MyRecipeDTO(Long id, String name, String drinkImgPath, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.drinkImgPath = drinkImgPath;
        this.createdAt = createdAt;
    }
}
