package Alchole_free.Cockpybara;
import com.google.api.client.googleapis.auth.oauth2.*;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.drive.Drive;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.Arrays;

@Configuration
public class GoogleDriveConfig {

    private final String CLIENT_ID = "789626258147-7lrhn10mtttcjlvtru2r1l9dn5lckib6.apps.googleusercontent.com";
    private final String CLIENT_SECRET = "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";
    private final String REFRESH_TOKEN = "1//04J5xcTyKCJldCgYIARAAGAQSNwF-L9IrBH5h3M1RE0oZ4HerbpISYp68hWvSL0SF-DERBluDat1clUKmlhXq-5LxRO7SM_ze5Y8";
    private final String APPLICATION_NAME = "Cockpybara";

    @Bean
    public Drive driveService() throws IOException, GeneralSecurityException {
        // Google Drive 인증 및 설정
        JsonFactory jsonFactory = new JacksonFactory();
        HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();

        // GoogleCredential 객체 생성
        GoogleCredential credential = authorize(jsonFactory, httpTransport);

        // Drive 객체 생성
        return new Drive.Builder(httpTransport, jsonFactory, credential)
                .setApplicationName(APPLICATION_NAME)
                .build();
    }

    private GoogleCredential authorize(JsonFactory jsonFactory, HttpTransport httpTransport) throws IOException {
        GoogleClientSecrets clientSecrets = loadClientSecrets(jsonFactory);

        // OAuth 2.0 인증 코드 플로우 설정
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                httpTransport, jsonFactory, clientSecrets,
                Arrays.asList("https://www.googleapis.com/auth/drive"))
                .build();

        // GoogleCredential 객체 생성
        GoogleCredential credential = new GoogleCredential.Builder()
                .setTransport(httpTransport)
                .setJsonFactory(jsonFactory)
                .setClientSecrets(CLIENT_ID, CLIENT_SECRET)
                .build();

        // 이미 얻어온 리프래시 토큰 설정
        credential.setRefreshToken(REFRESH_TOKEN);

        return credential;
    }

    private GoogleClientSecrets loadClientSecrets(JsonFactory jsonFactory) throws IOException {
        InputStream inputStream = getClass().getResourceAsStream("/client_secrets.json");
        return GoogleClientSecrets.load(jsonFactory, new InputStreamReader(inputStream));
    }
}