//package Alchole_free.Cockpybara.domain.cocktail_recipe;
//
//
//import lombok.Data;
//
//import java.time.LocalDateTime;
//
//@Data
//public class CocktailRecipeForCsv {
//    private String name;
//
//    private AlcoholicType alcoholicType;
//
//    private Category category;
//
//    private String drinkImgPath;
//
//    private Glass glass;
//
//    private String instruction;
//    private Boolean isMemberRecipe;
//    private LocalDateTime createdAt;
//
//    public static CocktailRecipe to(CocktailRecipeForCsv cocktailRecipeForCsv){
//        Alchole_free.Cockpybara.domain.cocktail_recipe.Category[] categories = Alchole_free.Cockpybara.domain.cocktail_recipe.Category.values();
//        Alchole_free.Cockpybara.domain.cocktail_recipe.AlcoholicType[] alcoholicTypes = Alchole_free.Cockpybara.domain.cocktail_recipe.AlcoholicType.values();
//        Alchole_free.Cockpybara.domain.cocktail_recipe.Glass[] glasses = Alchole_free.Cockpybara.domain.cocktail_recipe.Glass.values();
//
//        Alchole_free.Cockpybara.domain.cocktail_recipe.Category category=null;
//        Alchole_free.Cockpybara.domain.cocktail_recipe.AlcoholicType alcoholicType=null;
//        Alchole_free.Cockpybara.domain.cocktail_recipe.Glass glass=null;
//
//        for (Alchole_free.Cockpybara.domain.cocktail_recipe.Category category1 : categories) {
//            if(category1.getName().equals(cocktailRecipeForCsv.getCategory().getName()))
//                category=category1;
//        }
//
//        for (Alchole_free.Cockpybara.domain.cocktail_recipe.AlcoholicType type : alcoholicTypes) {
//            if(type.getName().toLowerCase().equals(cocktailRecipeForCsv.getAlcoholicType().getName().toLowerCase()))
//                alcoholicType=type;
//        }
//
//        for (Alchole_free.Cockpybara.domain.cocktail_recipe.Glass glass1 : glasses) {
//            if(glass1.getName()==null){
//                glass= Alchole_free.Cockpybara.domain.cocktail_recipe.Glass.NONE;
//                break;
//            }
//
//            if(glass1.getName().equals(cocktailRecipeForCsv.getGlass().getName()))
//                glass=glass1;
//        }
//
//        return new CocktailRecipe(
//                cocktailRecipeForCsv.getName(),
//                alcoholicType,
//                category,
//                cocktailRecipeForCsv.getDrinkImgPath(),
//                glass,
//                cocktailRecipeForCsv.getInstruction(),
//                cocktailRecipeForCsv.getIsMemberRecipe(),
//                LocalDateTime.now()
//        );
//    }
//}
