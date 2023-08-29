package Alchole_free.Cockpybara.service.member;

import Alchole_free.Cockpybara.controller.likes.add_like.AddLikeResponse;
import Alchole_free.Cockpybara.controller.likes.like_list.LikeDTO;
import Alchole_free.Cockpybara.domain.cocktail_recipe.CocktailRecipe;
import Alchole_free.Cockpybara.domain.member.Member;
import Alchole_free.Cockpybara.exception.member.DuplicateMemberException;
import Alchole_free.Cockpybara.repository.MemberRepository;
import Alchole_free.Cockpybara.repository.cocktail_recipe.CocktailRecipeRepository;
import Alchole_free.Cockpybara.service.member.member_detail.MemberDetailDTO;
import Alchole_free.Cockpybara.service.member.member_update.MemberUpdateDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final CocktailRecipeRepository cocktailRecipeRepository;

    @Transactional
    public Long join(Member member) {
        validateDuplicationMember(member);

        Member savedMember = memberRepository.save(member);
        return savedMember.getId();
    }

    public Member findById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다."));
    }

    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다."));
    }

    public Member login(String email, String password) {
        return memberRepository.findByEmailAndPassword(email, password)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다"));
    }

    public List<Member> findAll() {
        return memberRepository.findAll();
    }

    @Transactional
    public void memberLeave(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다"));

        memberRepository.delete(member);
    }

    public String findEmail(String alias, String phoneNumber) {
        Member member = memberRepository.findByAliasAndPhoneNumber(alias, phoneNumber)
                .orElseThrow(() -> new IllegalArgumentException("일치하는 멤버가 존재하지 않습니다."));

        return member.getEmail();
    }

    public void findPassword(String email, String alias, String phoneNumber) {
        memberRepository
                .findByEmailAndAliasAndPhoneNumber(email, alias, phoneNumber)
                .orElseThrow(() -> new IllegalArgumentException("일치하는 멤버가 존재하지 않습니다."));
    }

    @Transactional
    public void setNewPassword(String email, String password) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("일치하는 멤버가 존재하지 않습니다."));


        member.updatePassword(password);
    }

    @Transactional
    public MemberUpdateDTO updateMemberInfo(Long id, String alias, String phoneNumber) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다."));

        member.updateMember(alias, phoneNumber);

        return new MemberUpdateDTO().from(member);
    }

    public MemberDetailDTO getMemberDetails(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다."));

        MemberDetailDTO memberDetailDTO = new MemberDetailDTO().from(member);
        return memberDetailDTO;
    }


    private void validateDuplicationMember(Member member) {
        String email = member.getEmail();
        Optional<Member> foundResult = memberRepository.findByEmail(email);

        if (foundResult.isPresent()) {
            throw new DuplicateMemberException();
        }
    }


    @Transactional
    public void updateMemberImageUrl(String email, String imageUrl) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("해당 회원이 존재하지 않습니다."));

        member.updateImageUrl(imageUrl);
    }


    //즐겨찾기 관련 로직들
    @Transactional
    public AddLikeResponse addLike(Long userId, Long recipeId) {
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 멤버가 존재하지 않습니다."));
        CocktailRecipe cocktailRecipe = cocktailRecipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("해당 레시피가 존재하지 않습니다."));

        member.addLike(cocktailRecipe);
        return new AddLikeResponse(member.getId(), cocktailRecipe.getId());
    }

    @Transactional
    public void removeLike(Long userId, Long recipeId) {
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 멤버가 존재하지 않습니다."));

        member.removeLike(recipeId);
    }

    public List<LikeDTO> getLikes(Long userId) {
        Member member = findById(userId);
        List<LikeDTO> likes = member.getLikes().stream().map(like -> {
            Long recipeId = like.getCocktailRecipe().getId();
            String name = like.getCocktailRecipe().getName();
            String drinkImgPath = like.getCocktailRecipe().getDrinkImgPath();
            LocalDateTime createdAt = like.getCocktailRecipe().getCreatedAt();

            return new LikeDTO(recipeId, name, drinkImgPath, createdAt);
        }).collect(Collectors.toList());

        return likes;
    }

}
