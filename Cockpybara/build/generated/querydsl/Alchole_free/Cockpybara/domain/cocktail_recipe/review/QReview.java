package Alchole_free.Cockpybara.domain.cocktail_recipe.review;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReview is a Querydsl query type for Review
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReview extends EntityPathBase<Review> {

    private static final long serialVersionUID = 801195271L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReview review1 = new QReview("review1");

    public final Alchole_free.Cockpybara.domain.cocktail_recipe.QCocktailRecipe cocktailRecipe;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final Alchole_free.Cockpybara.domain.member.QMember member;

    public final StringPath review = createString("review");

    public final NumberPath<Integer> stars = createNumber("stars", Integer.class);

    public QReview(String variable) {
        this(Review.class, forVariable(variable), INITS);
    }

    public QReview(Path<? extends Review> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReview(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReview(PathMetadata metadata, PathInits inits) {
        this(Review.class, metadata, inits);
    }

    public QReview(Class<? extends Review> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.cocktailRecipe = inits.isInitialized("cocktailRecipe") ? new Alchole_free.Cockpybara.domain.cocktail_recipe.QCocktailRecipe(forProperty("cocktailRecipe")) : null;
        this.member = inits.isInitialized("member") ? new Alchole_free.Cockpybara.domain.member.QMember(forProperty("member")) : null;
    }

}

