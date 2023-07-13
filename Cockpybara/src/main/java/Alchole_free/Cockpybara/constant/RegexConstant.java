package Alchole_free.Cockpybara.constant;

public abstract class RegexConstant {
    public static final String EMAIL_REGEX="^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";

    public static final String PASSWORD_REGEX="^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&*]{8,15}$";

    public static final String PHONE_NUMBER_REGEX="^010-[0-9]{4}-[0-9]{4}$";

    public static final String ALIAS_REGEX="^[a-zA-Z가-힣]{2,10}$";

}
