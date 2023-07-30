package Alchole_free.Cockpybara.controller.my_recipe.update_my_recipe;

import Alchole_free.Cockpybara.domain.cocktail_recipe.AlcoholicType;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Category;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Glass;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Data
public class UpdateMyRecipeRequest {
    @NotNull
    @Length(max = 255)
    private String name;

    @NotNull
    private AlcoholicType alcoholicType;

    @NotNull
    private Category category;

    @NotNull
    private String drinkImgPath;

    @NotNull
    private Glass glass;

    @NotNull
    @Length(min = 20, max = 300)
    private String instruction;

    @NotNull
    @Size(max = 3)
    private List<Taste> tastes=new ArrayList<>();
}
