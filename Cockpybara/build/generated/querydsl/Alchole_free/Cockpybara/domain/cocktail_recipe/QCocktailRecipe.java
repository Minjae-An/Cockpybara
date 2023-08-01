package Alchole_free.Cockpybara.domain.cocktail_recipe;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCocktailRecipe is a Querydsl query type for CocktailRecipe
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCocktailRecipe extends EntityPathBase<CocktailRecipe> {

    private static final long serialVersionUID = -88286247L;

    public static final QCocktailRecipe cocktailRecipe = new QCocktailRecipe("cocktailRecipe");

    public final EnumPath<AlcoholicType> alcoholicType = createEnum("alcoholicType", AlcoholicType.class);

    public final EnumPath<Category> category = createEnum("category", Category.class);

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final StringPath drinkImgPath = createString("drinkImgPath");

    public final EnumPath<Glass> glass = createEnum("glass", Glass.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath instruction = createString("instruction");

    public final BooleanPath isMemberRecipe = createBoolean("isMemberRecipe");

    public final StringPath name = createString("name");

    public final ListPath<Alchole_free.Cockpybara.domain.cocktail_recipe.review.Review, Alchole_free.Cockpybara.domain.cocktail_recipe.review.QReview> reviews = this.<Alchole_free.Cockpybara.domain.cocktail_recipe.review.Review, Alchole_free.Cockpybara.domain.cocktail_recipe.review.QReview>createList("reviews", Alchole_free.Cockpybara.domain.cocktail_recipe.review.Review.class, Alchole_free.Cockpybara.domain.cocktail_recipe.review.QReview.class, PathInits.DIRECT2);

    public final ListPath<Alchole_free.Cockpybara.domain.cocktail_recipe.taste.RecipeTaste, Alchole_free.Cockpybara.domain.cocktail_recipe.taste.QRecipeTaste> tastes = this.<Alchole_free.Cockpybara.domain.cocktail_recipe.taste.RecipeTaste, Alchole_free.Cockpybara.domain.cocktail_recipe.taste.QRecipeTaste>createList("tastes", Alchole_free.Cockpybara.domain.cocktail_recipe.taste.RecipeTaste.class, Alchole_free.Cockpybara.domain.cocktail_recipe.taste.QRecipeTaste.class, PathInits.DIRECT2);

    public QCocktailRecipe(String variable) {
        super(CocktailRecipe.class, forVariable(variable));
    }

    public QCocktailRecipe(Path<? extends CocktailRecipe> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCocktailRecipe(PathMetadata metadata) {
        super(CocktailRecipe.class, metadata);
    }

}

