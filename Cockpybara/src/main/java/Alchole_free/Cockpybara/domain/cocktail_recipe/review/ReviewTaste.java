package Alchole_free.Cockpybara.domain.cocktail_recipe.review;

import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class ReviewTaste {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Review review;

    @Enumerated(value = EnumType.STRING)
    private Taste taste;
}
