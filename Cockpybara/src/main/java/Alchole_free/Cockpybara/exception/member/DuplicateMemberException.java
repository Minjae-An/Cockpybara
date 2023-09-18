package Alchole_free.Cockpybara.exception.member;

import Alchole_free.Cockpybara.exception.BusinessException;
import Alchole_free.Cockpybara.exception.ErrorCode;

public class DuplicateMemberException extends BusinessException {
    public DuplicateMemberException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }

    public DuplicateMemberException(ErrorCode errorCode) {
        super(errorCode);
    }
}
