package Alchole_free.Cockpybara.image;

import com.google.api.client.http.InputStreamContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.client.http.FileContent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;

@Service
public class ImageService {

    private final Drive driveService;

    @Autowired
    public ImageService(Drive driveService) {
        this.driveService = driveService;
    }

    public String uploadImage(MultipartFile file) {
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
            String uploadedImageUrl = uploadedFile.getWebViewLink();
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
}





