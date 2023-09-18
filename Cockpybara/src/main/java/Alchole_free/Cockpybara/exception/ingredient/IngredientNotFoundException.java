package Alchole_free.Cockpybara.exception.ingredient;

import Alchole_free.Cockpybara.exception.BusinessException;
import Alchole_free.Cockpybara.exception.ErrorCode;

public class IngredientNotFoundException extends BusinessException {
    public IngredientNotFoundException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }

    public IngredientNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
