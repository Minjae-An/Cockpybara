package Alchole_free.Cockpybara.image;

import Alchole_free.Cockpybara.service.member.MemberService;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.UUID;
import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/user/{userid}")
public class ImageController {

    @Autowired
    private AmazonS3 s3;
    private final MemberService memberService;
    public ImageController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/my-page-picture")
    public String uploadImage(@RequestParam("file") MultipartFile file,
                              @RequestParam("email") String email) {
        String bucketName = "cockpybara"; // 버킷 이름
        String uuid = UUID.randomUUID().toString(); //uuid랜덤이름 생성
        String objectKey = "profileImage/" + uuid;
        try {
            // 파일 컨텐츠 생성
            InputStream inputStream = file.getInputStream();

            //프로필 이미지 업로드
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            PutObjectRequest request = new PutObjectRequest(bucketName, objectKey, inputStream, metadata);
            s3.putObject(request);

            //객체의 ACL 모든 사용자에게 공개
            objectAclToAllUser(bucketName, objectKey);

            //기존 프로필 이미지 삭제
            String originalObjectName ="profileImage/" + getMemberImageUrlFromMemberService(email);
            s3.deleteObject(bucketName, originalObjectName);

            // 이미지 URL 생성 -> 이미지파일이름(objectKey) 관련해서 uuid사용하기(완료)
            String imageUrl = "https://kr.object.ncloudstorage.com/" + bucketName+"/"+ objectKey;

            //변경된 이미지URL 전송
            sendImageUrlToMemberService(email, imageUrl);

            return "File uploaded successfully. Object URL: " + imageUrl;
        } catch (AmazonS3Exception e) {
            e.printStackTrace();
            return "Error uploading file: " + e.getMessage();
        } catch (SdkClientException | IOException e) {
            e.printStackTrace();
            return "Error uploading file: " + e.getMessage();
        }
    }
    private void sendImageUrlToMemberService(String email, String imageUrl){
        memberService.updateMemberImageUrl(email, imageUrl);
    }
    private String getMemberImageUrlFromMemberService(String email){
        return memberService.getMemberImageurl(email);
    }

    private void objectAclToAllUser(String bucketName, String objectName){
        AccessControlList accessControlList = s3.getObjectAcl(bucketName, objectName);
        //현재 객체의 권한 clear
        accessControlList.getGrantsAsList().clear();
        //새로운 권한(전체 유저에게 읽기권한) 부여
        accessControlList.grantPermission(GroupGrantee.AllUsers, Permission.Read);
        //업데이트된 ACL s3객체에 적용
        s3.setObjectAcl(bucketName, objectName, accessControlList);
    }
}
