package Alchole_free.Cockpybara.repository.cocktail_recipe;

import Alchole_free.Cockpybara.domain.cocktail_recipe.AlcoholicType;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Category;
import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Glass;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import Alchole_free.Cockpybara.domain.ingredient.IngredientCategory;
import Alchole_free.Cockpybara.repository.cocktail_recipe.condition.CocktailRecipeSearchCondition;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static Alchole_free.Cockpybara.domain.cocktail_recipe.QCocktailRecipe.cocktailRecipe;
import static Alchole_free.Cockpybara.domain.cocktail_recipe.taste.QRecipeTaste.recipeTaste;
import static Alchole_free.Cockpybara.domain.ingredient.QRecipeIngredient.recipeIngredient;
import static org.springframework.util.StringUtils.hasText;

@RequiredArgsConstructor
public class CocktailRecipeRepositoryImpl implements CocktailRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<CocktailRecipe> search(CocktailRecipeSearchCondition searchCondition) {


        return queryFactory
                .selectFrom(cocktailRecipe)
                .join(cocktailRecipe.tastes, recipeTaste).fetchJoin()
                .leftJoin(cocktailRecipe.ingredients, recipeIngredient).fetchJoin()
                .leftJoin(recipeIngredient.ingredient).fetchJoin()
                .where(
                        nameLike(searchCondition.getName()),
                        alcoholicTypeIn(searchCondition.getAlcoholicTypes()),
                        categoryIn(searchCondition.getCategories()),
                        glassIn(searchCondition.getGlasses()),
                        recipeTasteIn(searchCondition.getTastes()),
                        ingredientCategoryIn(searchCondition.getIngredientCategories())
                ).fetch();
    }

    private BooleanExpression nameLike(String name) {
        return hasText(name) ? cocktailRecipe.name.contains(name) : null;
    }

    private BooleanExpression alcoholicTypeIn(List<AlcoholicType> alcoholicTypes) {
        return cocktailRecipe.alcoholicType.in(alcoholicTypes);
    }

    private BooleanExpression categoryIn(List<Category> categories) {
        return cocktailRecipe.category.in(categories);
    }

    private BooleanExpression glassIn(List<Glass> glasses) {
        return cocktailRecipe.glass.in(glasses);
    }

    private BooleanExpression recipeTasteIn(List<Taste> tastes) {
        return recipeTaste.taste.in(tastes);
    }

    private BooleanExpression ingredientCategoryIn(List<IngredientCategory> ingredientCategories) {
        return recipeIngredient.ingredient.ingredientCategory.in(ingredientCategories);
    }


}
