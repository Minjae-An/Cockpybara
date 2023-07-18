import com.opencsv.bean.CsvBindByName;
public class Ingredient {
    @CsvBindByName(column = "ingredient")
    private String name;

    @CsvBindByName(column = "unit")
    private String unit;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}
