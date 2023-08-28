package Alchole_free.Cockpybara.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class ImageController {

    private final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/image-upload")
    public String uploadImage(@RequestParam("file") MultipartFile file,
                              @RequestParam("email") String email) {
        System.out.println(email);
        return imageService.uploadImage(file, email);
    }
}
