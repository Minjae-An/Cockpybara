import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;
import com.opencsv.exceptions.CsvValidationException;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;

public class Main {
    private static HashMap<String, ArrayList<String>> map = new HashMap<>();
    private static HashSet<String> units = new HashSet<>();
    private static HashSet<String> glass = new HashSet<>();

    public static void main(String[] args) throws CsvValidationException, IOException {
        String csvFile = "src\\main\\resources\\all_drinks.csv"; // 읽을 CSV 파일의 경로

        //csv파일 수정 - 비슷한 단위들 단일화
        try (CSVReader reader = new CSVReader(new FileReader(csvFile))) {
            String[] nextLine = reader.readNext();

            int rowNumber = 1; // 현재 행 번호 - 단위존재x 재료찾는 코드에 사용
            while ((nextLine = reader.readNext()) != null) {
                glass.add(nextLine[7]);
                for (int i = 9; i <= 23; i++) {
                    String ingredient = nextLine[i];
                    if (ingredient == null || ingredient.trim().isEmpty()) {
                        continue;
                    }

                    String measure = nextLine[i + 16];
                    if (measure.equals("\n") || measure.trim().isEmpty()) {
                        printMissingIngredient(ingredient, rowNumber); // 단위가 존재하지 않는 재료 출력
                        measure = "fill"; // 단위가 존재하지 않는 경우 "fill"로 변경
                    }

                    measure = normalizeUnit(measure); // 단위 통일화

                    ArrayList<String> list = map.getOrDefault(ingredient, new ArrayList<>());
                    if (!list.contains(measure)) {
                        units.add(measure);
                        list.add(measure);
                    }
                    map.put(ingredient, list);
                }
                rowNumber++;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 칵테일 CSV 파일에서 재료와 단위를 정제하여 새로운 CSV 파일 생성
        String outputCsvFile = "src/main/resources/all_ingredients.csv"; // 저장할 CSV 파일의 경로

        try (CSVWriter writer = new CSVWriter(new FileWriter(outputCsvFile))) {
            // 헤더 라인 작성
            String[] header = {"Ingredient", "Unit"};
            writer.writeNext(header);

            // 데이터 작성
            for (HashMap.Entry<String, ArrayList<String>> entry : map.entrySet()) {
                String ingredient = entry.getKey();
                ArrayList<String> units = entry.getValue();

                for (String unit : units) {
                    String[] data = {ingredient, unit};
                    writer.writeNext(data);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 정제된 재료와 단위 출력
        System.out.println("Unit List:");
        for (String unit : units) {
            System.out.println(unit);
        }
        System.out.println("Total Units: " + units.size());

        // 파운드를 그램으로 변환
       // convertPoundToGram(outputCsvFile);
    }

    private static void printMissingIngredient(String ingredient, int rowNumber) {
        System.out.println("Missing Ingredient: " + ingredient + ", Row: " + rowNumber);
    }

    private static String normalizeUnit(String measure) {
        measure = measure.toLowerCase().trim();

        if (measure.contains("oz") || measure.contains("jigger")) {
            return "oz";
        }
        else if (measure.contains("ml") || measure.contains("dl") || measure.contains("pint")) {
            return "ml";
        }
        else if (measure.contains("tblsp")) {
            return "tblsp";
        }
        else if (measure.contains("tsp") || measure.contains("spoon")) {
            return "tsp";
        }
        else if (measure.contains("cup")) {
            return "cup";
        }
        else if (measure.contains("shot")) {
            return "shot";
        }
        else if (measure.contains("slice") || measure.contains("wedge")) {
            return "slice";
        }
        else if (measure.contains("scoop")) {
            return "scoop";
        }
        else if (measure.contains("cl") ||measure.contains("cL")  ) {
            return "cl";
        }
        else if (measure.contains("inch")) {
            return "inch";
        }
        else if (measure.contains("glass")) {
            return "glass";
        }
        else if (measure.contains("bottle")) {
            return "bottle";
        }
        else if (measure.contains("gr") || measure.contains("lb")) {
            return "gr";
        }
        else if (measure.contains("gal")) {
            return "gal";
        }
        else if (measure.contains("part")) {
            return "part";
        }
        else if (measure.contains("can")) {
            return "can";
        }
        else if (measure.contains("liter") ||measure.contains("quart") || measure.contains("qt")) {
            return "liter";
        }
        else if (measure.contains("dash") || measure.contains("splash")) {
            return "dash";
        }
        else if (measure.contains("count") || measure.contains("cube") || measure.contains("fifth")) {
            return "count";
        }
        else if (measure.contains("chunk") || measure.contains("piece") || measure.contains("whole")) {
            return "piece";
        }
        else if (measure.contains("stick")) {
            return "stick";
        }
        else if (measure.contains("fill") || measure.contains("with") || measure.contains("taste")
                || measure.contains("top") || measure.contains("up") || measure.contains("of")
                || measure.contains("garnish")|| measure.contains("full") || measure.contains("chilled")) {
            return "fill";
        }
        else if (measure.contains("drop")) {
            return "drop";
        }
        else if (measure.matches("\\d+(\\.\\d+)?")) {
            return "count";
        }

        return measure;
    }

}