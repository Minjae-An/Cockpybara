package Alchole_free.Cockpybara.service.member.member_detail;

import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.member.Gender;
import Alchole_free.Cockpybara.domain.member.Member;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class MemberDetailDTO {
    private String email;
    private String password;
    private String alias;
    private String phoneNumber;
    private Gender gender;
    private Date birth;

    private List<CocktailRecipe> likes;
    private List<CocktailRecipe> myRecipes;

    public MemberDetailDTO from(Member member){

        this.email=member.getEmail();
        this.password= member.getPassword();
        this.alias=member.getAlias();
        this.phoneNumber=member.getPhoneNumber();
        this.gender=member.getGender();
        this.birth=member.getBirth();

        likes = member.getLikes().stream()
                .map(like -> like.getCocktailRecipe())
                .collect(Collectors.toList());

        myRecipes = member.getMyRecipes().stream()
                .map(myRecipe -> myRecipe.getCocktailRecipe())
                .collect(Collectors.toList());

        return this;
    }
}
