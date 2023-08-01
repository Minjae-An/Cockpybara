package Alchole_free.Cockpybara.domain.member.my_recipe;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMyRecipe is a Querydsl query type for MyRecipe
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMyRecipe extends EntityPathBase<MyRecipe> {

    private static final long serialVersionUID = 950291065L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMyRecipe myRecipe = new QMyRecipe("myRecipe");

    public final Alchole_free.Cockpybara.domain.cocktail_recipe.QCocktailRecipe cocktailRecipe;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final Alchole_free.Cockpybara.domain.member.QMember member;

    public QMyRecipe(String variable) {
        this(MyRecipe.class, forVariable(variable), INITS);
    }

    public QMyRecipe(Path<? extends MyRecipe> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMyRecipe(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMyRecipe(PathMetadata metadata, PathInits inits) {
        this(MyRecipe.class, metadata, inits);
    }

    public QMyRecipe(Class<? extends MyRecipe> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.cocktailRecipe = inits.isInitialized("cocktailRecipe") ? new Alchole_free.Cockpybara.domain.cocktail_recipe.QCocktailRecipe(forProperty("cocktailRecipe")) : null;
        this.member = inits.isInitialized("member") ? new Alchole_free.Cockpybara.domain.member.QMember(forProperty("member")) : null;
    }

}

