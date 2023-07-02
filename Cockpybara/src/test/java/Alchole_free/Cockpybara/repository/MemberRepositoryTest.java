package Alchole_free.Cockpybara.repository;

import Alchole_free.Cockpybara.domain.Gender;
import Alchole_free.Cockpybara.domain.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;


    @Test
    void shouldFindMemberById() {
        Member member = new Member("ex@example.com", "1234", "alias1",
                "010-1111-2222", Gender.MALE, Date.valueOf("1998-01-01"));

        memberRepository.save(member);
        Member findMember = memberRepository.findById(member.getId()).get();

        assertThat(findMember).isEqualTo(member);
    }

    @Test
    void shouldFindMemberByEmail(){
        Member member = new Member("ex@example.com", "1234", "alias1",
                "010-1111-2222", Gender.MALE, Date.valueOf("1998-01-01"));

        memberRepository.save(member);
        String email = member.getEmail();
        Member findMember = memberRepository.findByEmail(email).get();

        assertThat(findMember).isEqualTo(member);
    }

    @Test
    void shouldFindMemberByEmailAndPassword(){
        Member member = new Member("ex@example.com", "1234", "alias1",
                "010-1111-2222", Gender.MALE, Date.valueOf("1998-01-01"));

        memberRepository.save(member);
        String email = member.getEmail();
        String password = member.getPassword();

        Member findMember = memberRepository.findByEmailAndPassword(email, password).get();
        assertThat(findMember).isEqualTo(member);
    }
}