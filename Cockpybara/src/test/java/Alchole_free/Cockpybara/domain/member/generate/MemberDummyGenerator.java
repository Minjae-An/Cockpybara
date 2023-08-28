package Alchole_free.Cockpybara.domain.member.generate;

import Alchole_free.Cockpybara.controller.member.join.JoinRequest;
import Alchole_free.Cockpybara.controller.member.util.HashingUtil;
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
            List<JoinRequest> joinRequests = Arrays.stream(objectMapper.readValue(file, JoinRequest[].class)).collect(Collectors.toList());

            List<Member> memberList = joinRequests.stream().map(joinRequest -> new Member(joinRequest.getEmail(), HashingUtil.hashValue(joinRequest.getPassword()),
                            joinRequest.getAlias(), joinRequest.getPhoneNumber(), joinRequest.getGender(), joinRequest.getBirth()))
                    .collect(Collectors.toList());

            return memberList;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return null;
    }
}
