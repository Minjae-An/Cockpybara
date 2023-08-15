package Alchole_free.Cockpybara;

import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.drive.Drive;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;

@Configuration
public class GoogleDriveConfig {

    @Bean
    public Drive driveService() throws IOException, GeneralSecurityException {
        // Google Drive 인증 및 설정
        JsonFactory jsonFactory = new JacksonFactory();

        // client_secrets.json 파일을 읽어와서 인증 정보 설정
        InputStream credentialsStream = getClass().getResourceAsStream("/client_secrets.json");
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(jsonFactory, new InputStreamReader(credentialsStream));

        // DriveScopes 등 다른 설정도 추가 가능
        return new Drive.Builder(GoogleNetHttpTransport.newTrustedTransport(), jsonFactory, null)
                .setApplicationName("Cockpybara")
                .build();
    }
}
