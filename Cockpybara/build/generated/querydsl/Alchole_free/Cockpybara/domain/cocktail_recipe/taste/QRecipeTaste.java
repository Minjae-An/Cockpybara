package Alchole_free.Cockpybara.domain.cocktail_recipe.taste;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRecipeTaste is a Querydsl query type for RecipeTaste
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRecipeTaste extends EntityPathBase<RecipeTaste> {

    private static final long serialVersionUID = -679243157L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRecipeTaste recipeTaste = new QRecipeTaste("recipeTaste");

    public final Alchole_free.Cockpybara.domain.cocktail_recipe.QCocktailRecipe cocktailRecipe;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final EnumPath<Taste> taste = createEnum("taste", Taste.class);

    public QRecipeTaste(String variable) {
        this(RecipeTaste.class, forVariable(variable), INITS);
    }

    public QRecipeTaste(Path<? extends RecipeTaste> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRecipeTaste(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRecipeTaste(PathMetadata metadata, PathInits inits) {
        this(RecipeTaste.class, metadata, inits);
    }

    public QRecipeTaste(Class<? extends RecipeTaste> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.cocktailRecipe = inits.isInitialized("cocktailRecipe") ? new Alchole_free.Cockpybara.domain.cocktail_recipe.QCocktailRecipe(forProperty("cocktailRecipe")) : null;
    }

}

