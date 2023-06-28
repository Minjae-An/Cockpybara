package Alchole_free.Cockpybara.repository;

import Alchole_free.Cockpybara.domain.Member;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class MemberRepositoryTest {
    @Autowired
    MemberRepository memberRepository;

    @BeforeEach
    public void before() {
        generateDummyData();
    }

    @Test
    public void shouldFindMember() {
        Member member = new Member("user1@example.com", "1234", "min", "010-1111-2222");

        Member savedMember = memberRepository.save(member);

        Member foundMember
                = memberRepository.findById(savedMember.getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다"));

        assertThat(foundMember).isEqualTo(member);
    }

    @Test
    public void shouldFindMemberByEmail() {
        String email = getRandEmail();

        Optional<Member> result = memberRepository.findByEmail(email);

        if (result.isEmpty()) {
            throw new IllegalStateException("해당 멤버가 존재않습니다");
        }

        Member member = result.get();
        assertThat(member.getEmail()).isEqualTo(email);
    }

    @Test
    public void shouldFindMemberByEmailAndPassword() {
        String email = getRandEmail();
        String password = getRandPW();

        Optional<Member> result = memberRepository.findByEmailAndPassword(email, password);

        if (result.isEmpty()) {
            throw new IllegalStateException("해당 멤버가 존재하지 않습니다");
        }

        Member member = result.get();
        assertThat(member.getEmail()).isEqualTo(email);
        assertThat(member.getPassword()).isEqualTo(password);
    }

    private String getRandPW() {
        String password = "password";
        password += (int) Math.random() % 10 + 1;
        return password;
    }

    private String getRandEmail() {
        String email = "dummy";
        email += (int) Math.random() % 9 + 1;
        email += "@example.com";
        return email;
    }

    private void generateDummyData() {
        String[] emails = {
                "dummy1@example.com",
                "dummy2@example.com",
                "dummy3@example.com",
                "dummy4@example.com",
                "dummy5@example.com",
                "dummy6@example.com",
                "dummy7@example.com",
                "dummy8@example.com",
                "dummy9@example.com",
                "dummy10@example.com"
        };

        String[] passwords = {
                "password1",
                "password2",
                "password3",
                "password4",
                "password5",
                "password6",
                "password7",
                "password8",
                "password9",
                "password10"
        };

        String[] aliases = {
                "Alias 1",
                "Alias 2",
                "Alias 3",
                "Alias 4",
                "Alias 5",
                "Alias 6",
                "Alias 7",
                "Alias 8",
                "Alias 9",
                "Alias 10"
        };

        String[] phoneNumbers = {
                "1234567890",
                "2345678901",
                "3456789012",
                "4567890123",
                "5678901234",
                "6789012345",
                "7890123456",
                "8901234567",
                "9012345678",
                "0123456789"
        };

        for (int i = 0; i < 10; i++) {
            Member member = new Member(emails[i], passwords[i], aliases[i], phoneNumbers[i]);
            memberRepository.save(member);
        }
    }
}