package Alchole_free.Cockpybara.repository.cocktail_recipe;

import Alchole_free.Cockpybara.domain.cocktail_recipe.*;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.QRecipeTaste;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.RecipeTaste;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import Alchole_free.Cockpybara.repository.cocktail_recipe.condition.CocktailRecipeSearchCondition;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

import static Alchole_free.Cockpybara.domain.cocktail_recipe.QCocktailRecipe.*;
import static Alchole_free.Cockpybara.domain.cocktail_recipe.taste.QRecipeTaste.*;
import static org.springframework.util.StringUtils.*;

@RequiredArgsConstructor
public class CocktailRecipeRepositoryImpl implements CocktailRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<CocktailRecipe> search(CocktailRecipeSearchCondition searchCondition) {
        return queryFactory
                .selectFrom(cocktailRecipe)
                .leftJoin(cocktailRecipe.tastes, recipeTaste)
                .where(nameLike(searchCondition.getName()),
                        alcoholicTypeEq(searchCondition.getAlcoholicType()),
                        categoryEq(searchCondition.getCategory()),
                        glassEq(searchCondition.getGlass()),
                        tasteEq(searchCondition.getRecipeTaste()),
                        isMemberRecipe(searchCondition.getIsMemberRecipe()))
                .fetch();
    }

    private BooleanExpression nameLike(String name) {
        return hasText(name) ? cocktailRecipe.name.contains(name) : null;
    }

    private BooleanExpression alcoholicTypeEq(AlcoholicType alcoholicType) {
        return Optional.of(alcoholicType).isEmpty() ? null : cocktailRecipe.alcoholicType.eq(alcoholicType);
    }

    private BooleanExpression categoryEq(Category category) {
        return Optional.of(category).isEmpty() ? null : cocktailRecipe.category.eq(category);
    }

    private BooleanExpression glassEq(Glass glass) {
        return Optional.of(glass).isEmpty() ? null : cocktailRecipe.glass.eq(glass);
    }

    private BooleanExpression tasteEq(RecipeTaste taste) {
        return Optional.of(taste).isEmpty() ? null : recipeTaste.eq(taste);
    }

    private BooleanExpression isMemberRecipe(Boolean isMemberRecipe) {
        return isMemberRecipe ? cocktailRecipe.isMemberRecipe.eq(true) : null;
    }
}
