package Alchole_free.Cockpybara.domain.ingredient;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRecipeIngredient is a Querydsl query type for RecipeIngredient
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRecipeIngredient extends EntityPathBase<RecipeIngredient> {

    private static final long serialVersionUID = 495821178L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRecipeIngredient recipeIngredient = new QRecipeIngredient("recipeIngredient");

    public final Alchole_free.Cockpybara.domain.cocktail_recipe.QCocktailRecipe cocktailRecipe;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QIngredient ingredient;

    public final NumberPath<Double> quantity = createNumber("quantity", Double.class);

    public final EnumPath<Unit> unit = createEnum("unit", Unit.class);

    public QRecipeIngredient(String variable) {
        this(RecipeIngredient.class, forVariable(variable), INITS);
    }

    public QRecipeIngredient(Path<? extends RecipeIngredient> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRecipeIngredient(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRecipeIngredient(PathMetadata metadata, PathInits inits) {
        this(RecipeIngredient.class, metadata, inits);
    }

    public QRecipeIngredient(Class<? extends RecipeIngredient> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.cocktailRecipe = inits.isInitialized("cocktailRecipe") ? new Alchole_free.Cockpybara.domain.cocktail_recipe.QCocktailRecipe(forProperty("cocktailRecipe")) : null;
        this.ingredient = inits.isInitialized("ingredient") ? new QIngredient(forProperty("ingredient")) : null;
    }

}

