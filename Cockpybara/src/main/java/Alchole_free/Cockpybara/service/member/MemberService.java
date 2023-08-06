package Alchole_free.Cockpybara.service.member;

import Alchole_free.Cockpybara.domain.member.Member;
import Alchole_free.Cockpybara.repository.MemberRepository;
import Alchole_free.Cockpybara.service.member.member_detail.MemberDetailDTO;
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
    public Long join(Member member) {
        validateDuplicationMember(member);

        Member savedMember = memberRepository.save(member);
        return savedMember.getId();
    }

    public Member findById(Long id){
        return memberRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("해당 회원이 존재하지 않습니다."));
    }

    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다."));
    }

    public Member login(String email, String password) {
        return memberRepository.findByEmailAndPassword(email, password)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다"));
    }

    public List<Member> findAll() {
        return memberRepository.findAll();
    }

    @Transactional
    public void memberLeave(Long id){
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("해당 회원이 존재하지 않습니다"));

        memberRepository.delete(member);
    }

    public String findEmail(String alias, String phoneNumber) {
        Member member = memberRepository.findByAliasAndPhoneNumber(alias, phoneNumber)
                .orElseThrow(() -> new IllegalStateException("일치하는 멤버가 존재하지 않습니다."));

        return member.getEmail();
    }

    public void findPassword(String email, String alias, String phoneNumber) {
        memberRepository
                .findByEmailAndAliasAndPhoneNumber(email, alias, phoneNumber)
                .orElseThrow(() -> new IllegalArgumentException("일치하는 멤버가 존재하지 않습니다."));
    }

    @Transactional
    public void setNewPassword(String email, String password) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("일치하는 멤버가 존재하지 않습니다."));


       member.updatePassword(password);
    }

    @Transactional
    public Member updateMemberInfo(Long id, String alias, String phoneNumber) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("해당 회원이 존재하지 않습니다."));

        member.updateMember(alias, phoneNumber);
        return member;
    }

    public MemberDetailDTO getMemberDetails(String email){
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("해당 회원이 존재하지 않습니다."));

        MemberDetailDTO memberDetailDTO = new MemberDetailDTO().from(member);
        return memberDetailDTO;
    }


    private void validateDuplicationMember(Member member) {
        String email = member.getEmail();
        Optional<Member> foundResult = memberRepository.findByEmail(email);

        if (foundResult.isPresent()) {
            throw new IllegalStateException("이미 가입된 회원이 존재합니다");
        }
    }

}
