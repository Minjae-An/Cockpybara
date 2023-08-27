package Alchole_free.Cockpybara.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class HashingUtil {

    private static final String HASH_ALGORITHM="SHA-256";

    public static String hashValue(String value){
        try{
            MessageDigest digest = MessageDigest.getInstance(HASH_ALGORITHM);

            byte[] encodedHash = digest.digest(value.getBytes(StandardCharsets.UTF_8));

            StringBuilder hexString = new StringBuilder();
            for (byte b : encodedHash) {
                String hex=Integer.toHexString(0xff & b);
                if(hex.length()==1){
                    hexString.append('0');
                }
                hexString.append(hex);
            }

            return hexString.toString();
        }catch(NoSuchAlgorithmException e){
            e.printStackTrace();
        }

        return null;
    }

}
