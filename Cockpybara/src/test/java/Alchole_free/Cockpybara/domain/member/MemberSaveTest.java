package Alchole_free.Cockpybara.domain.member;

import Alchole_free.Cockpybara.controller.member.join.JoinRequest;
import Alchole_free.Cockpybara.domain.member.generate.MemberDummyGenerator;
import Alchole_free.Cockpybara.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class MemberSaveTest {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    void shouldParseMemberDummy(){
        List<Member> memberDummyData =
                MemberDummyGenerator.getMemberDummyData();
        memberDummyData.forEach(member ->{
            System.out.println(member.getEmail()+" "+member.getPassword()+" "+member.getPhoneNumber()+" "+member.getAlias()+" "
            +member.getBirth()+" "+member.getGender());
        });
    }

    @Test
    void shouldValidMemberData(){
        List<Member> memberDummyData = MemberDummyGenerator.getMemberDummyData();
        memberDummyData.stream()
                .map(member ->
                        new JoinRequest(member.getEmail(), member.getPassword(), member.getAlias(),
                                member.getPhoneNumber(), member.getGender(), member.getBirth(), member.getImageUrl()))
                .forEach(joinRequest -> System.out.println(joinRequest.getEmail()));
    }

    @Test
    void shouldSaveMemberData(){
        List<Member> memberDummyData = MemberDummyGenerator.getMemberDummyData();
        memberDummyData.forEach(member -> memberRepository.save(member));

        List<Member> all = memberRepository.findAll();

        memberDummyData.equals(all);
    }
}
