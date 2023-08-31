package Alchole_free.Cockpybara.service.cocktail_recipe;

import Alchole_free.Cockpybara.controller.cocktailrecipe.recipe_detail.CocktailRecipeDetailDTO;
import Alchole_free.Cockpybara.controller.cocktailrecipe.search.CocktailRecipeSearchDTO;
import Alchole_free.Cockpybara.controller.my_recipe.add_new_my_recipe.AddNewMyRecipeRequest;
import Alchole_free.Cockpybara.controller.my_recipe.add_new_my_recipe.AddNewMyRecipeResponse;
import Alchole_free.Cockpybara.controller.my_recipe.my_recipes.MyRecipeDTO;
import Alchole_free.Cockpybara.controller.my_recipe.update_my_recipe.UpdateMyRecipeRequest;
import Alchole_free.Cockpybara.controller.my_recipe.update_my_recipe.UpdateMyRecipeResponse;
import Alchole_free.Cockpybara.domain.cocktail_recipe.AlcoholicType;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Category;
import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.cocktail_recipe.Glass;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.RecipeTaste;
import Alchole_free.Cockpybara.domain.cocktail_recipe.taste.Taste;
import Alchole_free.Cockpybara.domain.cocktail_recipe.time_period.TimePeriod;
import Alchole_free.Cockpybara.domain.ingredient.Ingredient;
import Alchole_free.Cockpybara.domain.ingredient.RecipeIngredient;
import Alchole_free.Cockpybara.domain.ingredient.Unit;
import Alchole_free.Cockpybara.domain.member.Member;
import Alchole_free.Cockpybara.domain.member.my_recipe.MyRecipe;
import Alchole_free.Cockpybara.repository.IngredientRepository;
import Alchole_free.Cockpybara.repository.MemberRepository;
import Alchole_free.Cockpybara.repository.cocktail_recipe.CocktailRecipeRepository;
import Alchole_free.Cockpybara.repository.cocktail_recipe.condition.CocktailRecipeSearchCondition;
import Alchole_free.Cockpybara.util.pagination.CustomPageRequest;
import Alchole_free.Cockpybara.util.pagination.CustomPageResponse;
import Alchole_free.Cockpybara.util.pagination.PagingUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CocktailRecipeService {
    private final CocktailRecipeRepository cocktailRecipeRepository;
    private final MemberRepository memberRepository;
    private final IngredientRepository ingredientRepository;

    public CustomPageResponse<CocktailRecipeSearchDTO> findCocktailRecipeByNameContaining(String name, CustomPageRequest pageRequest) {
        PageRequest request = PageRequest.of(pageRequest.getPage(), pageRequest.getSize());
        Page<CocktailRecipe> page = cocktailRecipeRepository.findCocktailRecipeByNameContaining(name, request);
        List<CocktailRecipeSearchDTO> content = page.get().map(CocktailRecipeSearchDTO::from).collect(Collectors.toList());

        CustomPageResponse<CocktailRecipeSearchDTO> response = new CustomPageResponse<>(page);
        response.setContent(content);
        return response;
    }

    public CocktailRecipe findById(Long id) {
        CocktailRecipe cocktailRecipe = cocktailRecipeRepository
                .findById(id)
                .orElseThrow(() -> new IllegalStateException("해당 레시피가 존재하지 않습니다."));

        return cocktailRecipe;
    }

    @Transactional
    public AddNewMyRecipeResponse saveMyRecipe(Long memberId, AddNewMyRecipeRequest addNewMyRecipeRequest) {
        addNewMyRecipeRequest.setIsMemberRecipe(true);
        addNewMyRecipeRequest.setCreatedAt(LocalDateTime.now());
        CocktailRecipe cocktailRecipe = addNewMyRecipeRequest.to();
        cocktailRecipeRepository.save(cocktailRecipe);

        //recipeIngredient 설정
        List<RecipeIngredient> recipeIngredients = addNewMyRecipeRequest.getIngredients().stream()
                .map(myRecipeIngredientDTO -> {
                    String name = myRecipeIngredientDTO.getName();
                    Ingredient ingredient = ingredientRepository.findByName(name)
                            .orElseThrow(() -> new IllegalStateException("해당 재료가 존재하지 않습니다."));
                    Double quantity = myRecipeIngredientDTO.getQuantity();
                    Unit unit = myRecipeIngredientDTO.getUnit();

                    return new RecipeIngredient(cocktailRecipe, ingredient, unit, quantity);
                }).collect(Collectors.toList());

        cocktailRecipe.setIngredients(recipeIngredients);

        //recipeTaste 설정
        List<RecipeTaste> recipeTastes = addNewMyRecipeRequest.getTastes().stream().map(taste -> new RecipeTaste(cocktailRecipe, taste))
                .collect(Collectors.toList());
        cocktailRecipe.setTastes(recipeTastes);

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalStateException("헤당 멤버가 존재하지 않습니다."));
        MyRecipe newMyRecipe = new MyRecipe(member, cocktailRecipe);
        member.getMyRecipes().add(newMyRecipe);

        return AddNewMyRecipeResponse.from(cocktailRecipe);
    }

    @Transactional
    public void removeMyRecipe(Long memberId, Long cocktailRecipeId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalStateException("해당 멤버가 존재하지 않습니다."));
        CocktailRecipe cocktailRecipe = findById(cocktailRecipeId);

        cocktailRecipeRepository.deleteById(cocktailRecipeId);
        member.removeMyRecipe(cocktailRecipe);
    }

    @Transactional
    public UpdateMyRecipeResponse updateMyRecipe(Long cocktailRecipeId, UpdateMyRecipeRequest updateMyRecipeRequest) {
        AlcoholicType alcoholicType = updateMyRecipeRequest.getAlcoholicType();
        Category category = updateMyRecipeRequest.getCategory();
        String drinkImgPath = updateMyRecipeRequest.getDrinkImgPath();
        Glass glass = updateMyRecipeRequest.getGlass();
        String instruction = updateMyRecipeRequest.getInstruction();
        List<Taste> tastes = updateMyRecipeRequest.getTastes();

        CocktailRecipe cocktailRecipe = cocktailRecipeRepository.findById(cocktailRecipeId)
                .orElseThrow(() -> new IllegalStateException("해당 레시피가 존재하지 않습니다."));

        cocktailRecipe.update(alcoholicType, category, drinkImgPath,
                glass, instruction, tastes);

        return new UpdateMyRecipeResponse(cocktailRecipe.getId());
    }

    public CustomPageResponse<MyRecipeDTO> getMyRecipe(Long userId, int page) {
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("해당 멤버가 존재하지 않습니다."));
        Pageable request = PageRequest.of(page, 3);

        List<MyRecipeDTO> myRecipes = member.getMyRecipes().stream().map(myRecipe -> {
            Long id = myRecipe.getCocktailRecipe().getId();
            String name = myRecipe.getCocktailRecipe().getName();
            String drinkImgPath = myRecipe.getCocktailRecipe().getDrinkImgPath();
            LocalDateTime createdAt = myRecipe.getCocktailRecipe().getCreatedAt();

            return new MyRecipeDTO(id, name, drinkImgPath, createdAt);
        }).collect(Collectors.toList());

        Page<MyRecipeDTO> pageResult = PagingUtil.listToPage(myRecipes, request);

        CustomPageResponse<MyRecipeDTO> response = new CustomPageResponse<>(pageResult);
        response.setContent(pageResult.getContent());
        return response;
    }


    // 주간, 월간, 전체기간 칵테일레시피 조회
    public CustomPageResponse<CocktailRecipeSearchDTO> getCocktailRecipesByPeriod(TimePeriod timePeriod, CustomPageRequest pageRequest) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startDateTime;

        PageRequest request = PageRequest.of(pageRequest.getPage(), pageRequest.getSize());


        Page<CocktailRecipe> page;

        switch (timePeriod) {
            case WEEKLY:
                startDateTime = now.minusWeeks(1);
                page = cocktailRecipeRepository.findCocktailRecipeByCreatedAtBetweenOrderByCreatedAtDesc(startDateTime, now, request);
                break;
            case MONTHLY:
                startDateTime = now.minusMonths(1);
                page = cocktailRecipeRepository.findCocktailRecipeByCreatedAtBetweenOrderByCreatedAtDesc(startDateTime, now, request);
                break;
            default:  //ALL은 여기포함
                page = cocktailRecipeRepository.findCocktailRecipeByOrderByCreatedAtDesc(request);
        }

        CustomPageResponse<CocktailRecipeSearchDTO> pageResponse = new CustomPageResponse<>(page);
        List<CocktailRecipeSearchDTO> content = page.get().map(CocktailRecipeSearchDTO::from).collect(Collectors.toList());
        pageResponse.setContent(content);

        return pageResponse;
    }

    public CocktailRecipeDetailDTO getDetail(Long id) {
        CocktailRecipe cocktailRecipe = cocktailRecipeRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("해당 레시피가 존재하지 않습니다."));

        CocktailRecipeDetailDTO cocktailRecipeDetailDTO = CocktailRecipeDetailDTO.from(cocktailRecipe);
        return cocktailRecipeDetailDTO;
    }

    public List<CocktailRecipeSearchDTO> search(CocktailRecipeSearchCondition searchCondition) {
        List<CocktailRecipe> searchResult = cocktailRecipeRepository.search(searchCondition);

        return searchResult.stream().map(CocktailRecipeSearchDTO::from)
                .collect(Collectors.toList());
    }
}
