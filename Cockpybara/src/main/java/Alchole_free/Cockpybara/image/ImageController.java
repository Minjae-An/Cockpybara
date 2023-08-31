package Alchole_free.Cockpybara.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user/{userid}")
public class ImageController {

    private final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/my-page-picture")
    public String uploadImage(@RequestParam("file") MultipartFile file,
                              @RequestParam("email") String email) {
        return imageService.uploadImage(file, email);
    }
}
