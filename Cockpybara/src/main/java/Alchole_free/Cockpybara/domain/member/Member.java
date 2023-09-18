package Alchole_free.Cockpybara.domain.member;

import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.member.likes.Like;
import Alchole_free.Cockpybara.domain.member.my_recipe.MyRecipe;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;

    private String alias;

    private String phoneNumber;
    private Gender gender;
    private Date birth;
    private String imageUrl;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MyRecipe> myRecipes = new ArrayList<>();


    public Member(String email, String password, String alias, String phoneNumber, Gender gender, Date birth, String imageUrl) {
        this.email = email;
        this.password = password;
        this.alias = alias;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.birth = birth;
        this.imageUrl = imageUrl;
    }

    public void updatePassword(String password) {this.password = password;}

    public void updateMember(String alias, String phoneNumber) {
        this.alias = alias;
        this.phoneNumber = phoneNumber;
    }

    public void updateImageUrl(String imageUrl){this.imageUrl = imageUrl;}

    public void addNewMyRecipe(MyRecipe myRecipe) {
        myRecipes.add(myRecipe);
    }

    public void removeMyRecipe(CocktailRecipe cocktailRecipe) {
        myRecipes.removeIf(myRecipe ->
                myRecipe.getCocktailRecipe().equals(cocktailRecipe));
    }

    public Like addLike(CocktailRecipe recipe) {
        Like like = new Like(this, recipe);
        likes.add(like);
        return like;
    }

    public void removeLike(Long recipeId) {
        likes.removeIf(like ->
                like.getCocktailRecipe().getId().equals(recipeId));
    }

}
