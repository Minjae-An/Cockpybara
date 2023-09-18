package Alchole_free.Cockpybara.exception.cocktail_recipe;

import Alchole_free.Cockpybara.exception.BusinessException;
import Alchole_free.Cockpybara.exception.ErrorCode;

public class CocktailRecipeNotFoundException extends BusinessException {
    public CocktailRecipeNotFoundException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }

    public CocktailRecipeNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
