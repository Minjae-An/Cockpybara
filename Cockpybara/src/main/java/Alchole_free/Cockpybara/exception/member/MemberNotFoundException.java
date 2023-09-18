package Alchole_free.Cockpybara.exception.member;

import Alchole_free.Cockpybara.exception.BusinessException;
import Alchole_free.Cockpybara.exception.ErrorCode;

public class MemberNotFoundException extends BusinessException {
    public MemberNotFoundException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }

    public MemberNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
