package Alchole_free.Cockpybara.service.cocktail_recipe;

import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.member.Member;
import Alchole_free.Cockpybara.domain.member.my_recipe.MyRecipe;
import Alchole_free.Cockpybara.repository.CocktailRecipeRepository;
import Alchole_free.Cockpybara.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CocktailRecipeService {
    private final CocktailRecipeRepository cocktailRecipeRepository;
    private final MemberRepository memberRepository;

    public List<CocktailRecipe> findCocktailRecipeByNameContaining(String name) {
        return cocktailRecipeRepository.findCocktailRecipeByNameContaining(name);
    }

    public CocktailRecipe findById(Long id) {
        return cocktailRecipeRepository
                .findById(id)
                .orElseThrow(() -> new IllegalStateException("해당 레시피가 존재하지 않습니다."));
    }

    public MyRecipe saveMyRecipe(Long memberId, CocktailRecipe cocktailRecipe) {
        CocktailRecipe savedRecipe = cocktailRecipeRepository.save(cocktailRecipe);
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalStateException("해당 멤버가 존재하지 않습니다."));

        MyRecipe myRecipe = new MyRecipe(findMember, savedRecipe);
        findMember.addNewMyRecipe(myRecipe);
        return myRecipe;
    }

    public void removeMyRecipe(Long memberId, Long cocktailRecipeId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalStateException("해당 멤버가 존재하지 않습니다."));
        CocktailRecipe cocktailRecipe = findById(cocktailRecipeId);

        cocktailRecipeRepository.deleteById(cocktailRecipeId);
        member.removeMyRecipe(cocktailRecipe);
    }
}
