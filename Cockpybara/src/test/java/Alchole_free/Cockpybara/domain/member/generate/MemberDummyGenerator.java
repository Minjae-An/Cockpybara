package Alchole_free.Cockpybara.domain.member.generate;

import Alchole_free.Cockpybara.domain.member.Member;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public abstract class MemberDummyGenerator {
    private static final String path = "C:\\Cockpybara\\Cockpybara\\src\\test\\resource\\member_mock_data.json";

    public static List<Member> getMemberDummyData() {
        try {
            File file = new File(path);
            ObjectMapper objectMapper = new ObjectMapper();
            List<Member> memberList = Arrays.stream(objectMapper.readValue(file, Member[].class)).collect(Collectors.toList());

            return memberList;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return null;
    }
}
