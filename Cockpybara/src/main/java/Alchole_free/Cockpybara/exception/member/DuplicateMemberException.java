package Alchole_free.Cockpybara.exception.member;

public class DuplicateMemberException extends RuntimeException {
    public DuplicateMemberException() {
        super("이미 가입한 계정이 존재합니다.");
    }
}
