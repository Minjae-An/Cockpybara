package Alchole_free.Cockpybara.image;

import com.google.api.services.drive.Drive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService {

    private final Drive driveService; // Google Drive 연동을 위한 서비스

    @Autowired
    public ImageService(Drive driveService) {
        this.driveService = driveService;
    }

    public String uploadImage(MultipartFile file) {
        // 이미지 업로드 로직 구현
        // 구글 드라이브에 파일 업로드하고 URL을 반환
        String test = "testurl";
        return test;
    }
}
