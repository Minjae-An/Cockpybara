package Alchole_free.Cockpybara.domain.ingredient;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QIngredient is a Querydsl query type for Ingredient
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QIngredient extends EntityPathBase<Ingredient> {

    private static final long serialVersionUID = 1142587788L;

    public static final QIngredient ingredient = new QIngredient("ingredient");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final EnumPath<IngredientCategory> ingredientCategory = createEnum("ingredientCategory", IngredientCategory.class);

    public final StringPath name = createString("name");

    public QIngredient(String variable) {
        super(Ingredient.class, forVariable(variable));
    }

    public QIngredient(Path<? extends Ingredient> path) {
        super(path.getType(), path.getMetadata());
    }

    public QIngredient(PathMetadata metadata) {
        super(Ingredient.class, metadata);
    }

}

