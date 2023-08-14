package Alchole_free.Cockpybara;

import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.util.Utils;
import java.io.FileInputStream;
import java.io.InputStreamReader;

public class GoogleAPISettings {
    public static GoogleClientSecrets getClientSecrets() {
        try {
            return GoogleClientSecrets.load(
                    Utils.getDefaultJsonFactory(),
                    new InputStreamReader(new FileInputStream("src/main/resources/client_secrets.json"))
            );
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
