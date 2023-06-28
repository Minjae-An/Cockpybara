package Alchole_free.Cockpybara.service;

import Alchole_free.Cockpybara.domain.Member;
import Alchole_free.Cockpybara.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    @Transactional
    public Long join(Member member){
        validateDuplicationMember(member);

        Member savedMember = memberRepository.save(member);
        return savedMember.getId();
    }

    public Member findByEmail(String email){
        return  memberRepository.findByEmail(email)
                        .orElseThrow(()->new IllegalArgumentException("해당 회원이 존재하지 않습니다."));
    }

    public Member findByEmailAndPassword(String email, String password){
        return memberRepository.findByEmailAndPassword(email, password)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다"));
    }

    public List<Member> findAll(){
        return memberRepository.findAll();
    }

    private void validateDuplicationMember(Member member){
        String email = member.getEmail();
        Optional<Member> foundResult = memberRepository.findByEmail(email);

        if(foundResult.isPresent()){
            throw new IllegalStateException("이미 가입된 회원이 존재합니다");
        }
    }

}
