package Alchole_free.Cockpybara.repository;

import Alchole_free.Cockpybara.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);
    Optional<Member> findByEmailAndPassword(String email, String password);

    Optional<Member> findByAliasAndPhoneNumber(String alias, String phoneNumber);

    Optional<Member> findByEmailAndAliasAndPhoneNumber(String email, String alias, String phoneNumber);
}
