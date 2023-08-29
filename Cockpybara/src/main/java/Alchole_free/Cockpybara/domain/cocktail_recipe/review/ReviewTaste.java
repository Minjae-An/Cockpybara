package Alchole_free.Cockpybara.domain.cocktail_recipe.review;

import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ReviewTaste {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Review review;

    @Enumerated(value = EnumType.STRING)
    private Taste taste;

    public ReviewTaste(Review review, Taste taste) {
        this.review = review;
        this.taste = taste;
    }
}
