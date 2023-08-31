package Alchole_free.Cockpybara.controller.likes;

import Alchole_free.Cockpybara.controller.likes.add_like.AddLikeResponse;
import Alchole_free.Cockpybara.controller.likes.like_list.LikeDTO;
import Alchole_free.Cockpybara.service.member.MemberService;
import Alchole_free.Cockpybara.util.pagination.CustomPageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user/{userId}")
public class LikesController {
    private final MemberService memberService;

    @PostMapping("/likes/{recipeId}")
    public ResponseEntity<AddLikeResponse> addLike(@PathVariable Long userId, @PathVariable Long recipeId) {
        AddLikeResponse addLikeResponse = memberService.addLike(userId, recipeId);
        return ResponseEntity.ok(addLikeResponse);
    }

    @DeleteMapping("/likes/{recipeId}")
    public ResponseEntity<String> removeLike(@PathVariable Long userId, @PathVariable Long recipeId) {
        memberService.removeLike(userId, recipeId);

        return ResponseEntity.ok("successfully remove like");
    }

    @GetMapping("/likes-list")
    public ResponseEntity<CustomPageResponse<LikeDTO>> getLikes(@PathVariable Long userId, int page) {
        CustomPageResponse<LikeDTO> likes = memberService.getLikes(userId, page);
        return ResponseEntity.ok(likes);
    }
}
