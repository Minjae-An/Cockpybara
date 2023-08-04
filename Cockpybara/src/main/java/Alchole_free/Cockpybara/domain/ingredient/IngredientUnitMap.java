package Alchole_free.Cockpybara.domain.ingredient;

import java.util.HashMap;
import java.util.Map;

public class IngredientUnitMap {
    public static Map<IngredientCategory, Unit[]> createIngredientUnitMap() {
        Map<IngredientCategory, Unit[]> ingredientUnitMap = new HashMap<>();

        //각 카테고리별 해당 단위 맵 리턴 - 단위 오류시 추후 수정
        ingredientUnitMap.put(IngredientCategory.LIQUID, new Unit[]{Unit.FILL, Unit.OZ, Unit.PART, Unit.LITER, Unit.COUNT, Unit.ML, Unit.DASH, Unit.DROP, Unit.TSP, Unit.CUP, Unit.GLASS, Unit.BOTTLE, Unit.SLICE, Unit.TBLSP, Unit.CAN, Unit.GAL});
        ingredientUnitMap.put(IngredientCategory.FRUIT, new Unit[]{Unit.COUNT, Unit.CUP, Unit.PIECE, Unit.FILL, Unit.GR, Unit.SLICE, Unit.PART, Unit.LB, Unit.TBLSP, Unit.OZ});
        ingredientUnitMap.put(IngredientCategory.SYRUP, new Unit[]{Unit.FILL, Unit.TSP, Unit.OZ, Unit.DROP, Unit.GR, Unit.TBLSP, Unit.PART, Unit.DASH, Unit.COUNT, Unit.CUP, Unit.ML});
        ingredientUnitMap.put(IngredientCategory.ETC, new Unit[]{Unit.PIECE, Unit.TBLSP, Unit.TSP, Unit.ML, Unit.COUNT, Unit.OZ, Unit.INCH, Unit.DASH, Unit.GR, Unit.STICK, Unit.FILL, Unit.CUP, Unit.PART, Unit.GLASS, Unit.SCOOP, Unit.SLICE});

        return ingredientUnitMap;
    }
}

