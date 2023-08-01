package Alchole_free.Cockpybara.domain.member;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = 1935847916L;

    public static final QMember member = new QMember("member1");

    public final StringPath alias = createString("alias");

    public final DatePath<java.sql.Date> birth = createDate("birth", java.sql.Date.class);

    public final StringPath email = createString("email");

    public final EnumPath<Alchole_free.Cockpybara.domain.Gender> gender = createEnum("gender", Alchole_free.Cockpybara.domain.Gender.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final ListPath<Alchole_free.Cockpybara.domain.member.likes.Like, Alchole_free.Cockpybara.domain.member.likes.QLike> likes = this.<Alchole_free.Cockpybara.domain.member.likes.Like, Alchole_free.Cockpybara.domain.member.likes.QLike>createList("likes", Alchole_free.Cockpybara.domain.member.likes.Like.class, Alchole_free.Cockpybara.domain.member.likes.QLike.class, PathInits.DIRECT2);

    public final ListPath<Alchole_free.Cockpybara.domain.member.my_recipe.MyRecipe, Alchole_free.Cockpybara.domain.member.my_recipe.QMyRecipe> myRecipes = this.<Alchole_free.Cockpybara.domain.member.my_recipe.MyRecipe, Alchole_free.Cockpybara.domain.member.my_recipe.QMyRecipe>createList("myRecipes", Alchole_free.Cockpybara.domain.member.my_recipe.MyRecipe.class, Alchole_free.Cockpybara.domain.member.my_recipe.QMyRecipe.class, PathInits.DIRECT2);

    public final StringPath password = createString("password");

    public final StringPath phoneNumber = createString("phoneNumber");

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

