package Alchole_free.Cockpybara.image;

import Alchole_free.Cockpybara.domain.member.Member;
import Alchole_free.Cockpybara.service.member.MemberService;
import com.google.api.client.http.InputStreamContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;

@Service
public class ImageService {

    private final Drive driveService;

    private final MemberService memberService;
    private String uploadedImageUrl;
    @Autowired
    public ImageService(Drive driveService, MemberService memberService) {
        this.driveService = driveService;
        this.memberService = memberService;
    }

    public String uploadImage(MultipartFile file, String email) {
        try {
            // 파일 메타데이터 생성
            File fileMetadata = new File();
            fileMetadata.setName(file.getOriginalFilename());
            fileMetadata.setParents(Collections.singletonList("1r6EXdUBsv9ndLwt00ZGUJMfvCdvdccqa")); // 부모 폴더 ID 설정

            // 파일 컨텐츠 생성
            InputStreamContent mediaContent = new InputStreamContent(file.getContentType(), file.getInputStream());

            // 파일 업로드
            File uploadedFile = driveService.files().create(fileMetadata, mediaContent)
                    .setFields("id, webViewLink") // 업로드한 파일의 ID와 웹 링크만 가져오기
                    .execute();

            // 업로드한 파일의 웹 링크 반환
            uploadedImageUrl = uploadedFile.getWebViewLink();

            // MemberService로 url 보내기
            //sendImageUrlToMemberService(uploadedImageUrl);

            //반환은 MemberService에서 이뤄져야함 - 여기는 빼야함
            return uploadedImageUrl;
        } catch (IOException e) {
            // 파일 업로드 중 IOException 발생 시 처리
            e.printStackTrace();
            return "Error uploading image: " + e.getMessage();
        } catch (Exception e) {
            // 기타 예외 발생 시 처리
            e.printStackTrace();
            return "Error uploading image: An unexpected error occurred.";
        }
    }

    private void sendImageUrlToMemberService(String email, String imageUrl) {
        memberService.updateMemberImageUrl(email, imageUrl);
    }

}





